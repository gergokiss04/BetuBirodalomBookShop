using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using BookShopWebAPI.Models;
using System.Linq;

namespace BookShopWebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class passwordController : ControllerBase
    {
        [HttpPost("{username},{oldpassword},{newpassword}")]

        public IActionResult passwordMosositas(string username, string oldpassword, string newpassword)
        {
            try
            {
                using (bookshopContext context = new bookshopContext())
                {
                    var users = context.Users.Where(f => f.Username == username).ToList();
                    Console.WriteLine();
                    if (users.Count > 0)
                    {
                        if (oldpassword == users[0].Hash)
                        {
                            User user = users[0];
                            user.Hash = newpassword;
                            context.Users.Update(user);
                            context.SaveChanges();
                            return Ok("A jelszó módosítása sikeresen megtörtént.");
                        }
                        else
                        {
                            return StatusCode(201, "Hibás a régi jelszó!");
                        }
                    }
                    else
                    {
                        return BadRequest("Nincs ilyen nevű felhasználó!");
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{Email}")]
        public IActionResult Elfelejtettpassword(string Email)
        {
            using (bookshopContext context = new bookshopContext())
            {
                try
                {
                    var users = context.Users.Where(f => f.Email == Email).ToList();
                    if (users.Count > 0)
                    {
                        string password = Program.GenerateSalt().Substring(0, 12);
                        users[0].Hash = Program.CreateSHA256(Program.CreateSHA256(password + users[0].Salt));
                        context.Users.Update(users[0]);
                        context.SaveChanges();
                        Program.SendEmail(@users[0].Email, "Elfelejtett jelszó", "Az új jelszava: " + password);
                        return Ok("E-mail küldése megtörtént.");
                    }
                    else
                    {
                        return StatusCode(210, "Nincs ilyen e-Mail cím!");
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(211, ex.Message);
                }
            }
        }
    }
}