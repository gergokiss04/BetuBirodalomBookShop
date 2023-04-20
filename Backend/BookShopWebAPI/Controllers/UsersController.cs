using BookShopWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShopWebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet("GetUsers")]
        public IActionResult Get()
        {
            using(var context=new bookshopContext())
            {
                try
                {
                    return Ok(context.Users.ToList());
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpGet("GetUserBy/{id}")]
        public IActionResult Get(int id)
        {
            using(var context=new bookshopContext())
            {
                try 
                {
                    return Ok(context.Users.Where(cx => cx.Id == id));
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpPost("PostUser")]
        public IActionResult PostUser([FromBody] User user)
        {
            using(var context=new bookshopContext())
            {
                try
                {
                    context.Users.Add(user);
                    context.SaveChanges();
                    return StatusCode(201, "Új user sikeresen feltöltve!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpPut("UpdateUser")]
        public IActionResult UpdateUser([FromBody] User user)
        {
            using(var context = new bookshopContext())
            {
                try
                {
                    context.Users.Update(user);
                    context.SaveChanges();
                    return StatusCode(201, "Sikeres user módosítás");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpDelete("DeleteUser/{id}")]
        public IActionResult Delete(int id)
        {
            using(var context=new bookshopContext())
            {
                try
                {
                    User user = new User();
                    user.Id = id;
                    context.Users.Remove(user);
                    context.SaveChanges();
                    return StatusCode(201, "User sikeresen törölve!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
