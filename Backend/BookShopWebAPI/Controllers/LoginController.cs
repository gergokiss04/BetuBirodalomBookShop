using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookShopWebAPI.Models;
using System.Linq;
using System;
using System.Web;

namespace BookShopWebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost("SaltRequest/{name}")]

        public IActionResult SaltRequest(string name)
        {
            //string salt=SuliVerseny.Program.GenerateSalt();
            //Console.WriteLine(salt.Length);
            using (var context = new bookshopContext())
            {
                try
                {
                    List<User> found = new List<User>(context.Users.Where(f => f.Username == name));
                    if (found.Count > 0)
                    {
                        return Ok(found[0].Salt);
                        //return Ok(SuliVerseny.Program.CreateSHA256("a" + found[0].Salt));
                    }
                    else
                    {
                        return BadRequest("Hibás felhasználónév!");
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);
                }
            }
        }

        [HttpPost]

        public IActionResult Login(string name, string tmpHash)
        {
            using (var context = new bookshopContext())
            {
                try
                {
                    List<User> found = new List<User>(context.Users.Where(f => f.Username == name));
                    if (found.Count > 0)
                    {
                        //Egyszerre csak egy gépről lehet dolgozni eleje
                        bool talalt = false;
                        int index = 0;
                        int number = Program.LoggedInUsers.Count;
                        while (!talalt && index < number)
                        {
                            if (Program.LoggedInUsers.ElementAt(index).Value.Username == name)
                            {
                                lock (Program.LoggedInUsers)
                                {
                                    Program.LoggedInUsers.Remove(Program.LoggedInUsers.ElementAt(index).Key);
                                }
                                talalt = true;
                            }
                            index++;
                        }
                        //Egyszerre csak egy gépről lehet dolgozni vége
                        string hash = BookShopWebAPI.Program.CreateSHA256(tmpHash);
                        if (hash == found[0].Hash)
                        {
                            string token = Guid.NewGuid().ToString();
                            lock (Program.LoggedInUsers)
                            {
                                Program.LoggedInUsers.Add(token, found[0]);
                            }
                            string[] response = new string[3] { token, found[0].Fullname, found[0].ToString() };
                            return StatusCode(200, response);
                            return Ok(response);
                        }
                        else
                        {
                            string[] response = new string[3] { "Hibás jelszó!", "", "-1" };
                            return Ok(response);
                        }
                    }
                    else
                    {
                        string[] response = new string[3] { "Hibás név/Inaktív felhasználó!", "", "-1" };
                        return Ok(response);
                    }
                }
                catch (Exception ex)
                {
                    string[] response = new string[3] { ex.Message, "", "-1" };
                    return Ok(response);
                }
            }
        }
    }
}