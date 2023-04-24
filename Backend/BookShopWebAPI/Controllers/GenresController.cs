using BookShopWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShopWebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        [HttpGet("GetGenres")]
        public IActionResult GetGenres()
        {
            using (var context = new bookshopContext())
            {
                try
                {
                    return Ok(context.Genres.ToList());
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpGet("GetGenreBy/{id}")]
        public IActionResult GetGenreBy(int id)
        {
            using (var context = new bookshopContext())
            {
                try
                {
                    return Ok(context.Genres.Where(cx => cx.Id == id).ToList());
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpPost("PostGenre")]
        public IActionResult PostGenre([FromBody] Genre genre)
        {
            using (var context = new bookshopContext())
            {
                try
                {
                    context.Genres.Add(genre);
                    context.SaveChanges();
                    return StatusCode(201, "Sikeres Feltöltés!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpPut("UpdateGenre")]
        public IActionResult UpdateGenre([FromBody] Genre genre)
        {
            using (var context = new bookshopContext())
            {
                try
                {
                    context.Genres.Update(genre);
                    context.SaveChanges();
                    return StatusCode(201, "Sikeres módosítás!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpDelete("DeleteGenre/{id}")]
        public IActionResult DeleteGenre(int id)
        {
            using(var context = new bookshopContext())
            {
                try
                {
                    Genre genre = new Genre();
                    genre.Id = id;
                    context.Genres.Remove(genre);
                    context.SaveChanges();
                    return StatusCode(201, "Sikeres törlés");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
