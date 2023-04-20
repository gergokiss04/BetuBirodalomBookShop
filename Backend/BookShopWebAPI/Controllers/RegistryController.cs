using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookShopWebAPI.Models;
using System;
using System.Linq;
using System.Net.Mail;

namespace BookShopWebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RegistryController : ControllerBase
    {
        [HttpPost]

        public IActionResult Post(Registry registry)
        {
            using (var context = new bookshopContext())
            {
                try
                {
                    if (context.Users.Where(f => f.Username == registry.Username).ToList().Count != 0)
                    {
                        return StatusCode(210, "Létezik ilyen felhasználónév!");
                    }
                    if (context.Users.Where(f => f.Email == registry.Email).ToList().Count != 0)
                    {
                        return StatusCode(211, "Erről az e-mail címről már regisztráltak!");
                    }
                    if (registry.Username != "" && registry.Email != "")
                    {
                        registry.Key = Program.GenerateSalt();
                        context.Add(registry);
                        context.SaveChanges();
                        Program.SendEmail(registry.Email, "Regisztráció", "A regisztrációhoz kattints a következő linkre: " + "https://localhost:7280/Registry/" + registry.Key);
                        return StatusCode(200, "Sikeres regisztráció. Az e-mail címére küldött utasítások alapján befejezheti azt.");
                    }
                    else
                    {
                        return StatusCode(200, "Ellenőrzés lefuttatva!");
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(200, ex.Message);
                }
            }
        }

        [HttpGet("{Key}")]

        public IActionResult Get(string Key)
        {
            using (var context = new bookshopContext())
            {
                try
                {
                    var registryUser = context.Registries.Where(c => c.Key == Key).ToList();
                    if (registryUser.Count != 0)
                    {
                        User user = new User();
                        user.Username = registryUser[0].Username;
                        user.Fullname = registryUser[0].Fullname;
                        user.Salt = registryUser[0].Salt;
                        user.Hash = registryUser[0].Hash;
                        user.Email = registryUser[0].Email;
                        context.Users.Add(user);
                        context.Registries.Remove(registryUser[0]);
                        context.SaveChanges();
                        return Ok("Regisztráció befejezve.");
                    }
                    else
                    {
                        return BadRequest("A regisztráció már megtörtént vagy hibás kulcs került megadásra!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
