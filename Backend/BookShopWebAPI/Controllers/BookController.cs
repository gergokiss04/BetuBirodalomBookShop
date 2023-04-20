using BookShopWebAPI.Models;
using Microsoft.AspNetCore.DataProtection.XmlEncryption;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookShopWebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        [HttpGet("All_books")]
        public IActionResult Getkonyvek()
        {
            using (var context = new bookshopContext())
            {
                try
                {
                    return Ok(context.Books.ToList());
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpGet("Books-by-genre")]
        public IActionResult GetBooksByGenre()
        {
            try
            {
                using (var context = new bookshopContext())
                {
                    var valami = context.Books.Include(book => book.Genre).ToList();
                    Dictionary<int, int> szotar = new Dictionary<int, int>();
                    List<Book> books = new List<Book>();

                    foreach (var book in valami)
                    {
                        if (szotar.ContainsKey(book.GenreId))
                        {
                            if (szotar[book.GenreId] < 4)
                            {
                                szotar[book.GenreId] += 1;
                                books.Add(book);
                            }
                        }
                        else
                        {
                            szotar[book.GenreId] = 1;
                            books.Add(book);
                        }
                    }

                    var response = books
                        .GroupBy(book => book.Genre.Genre1)
                        .ToDictionary(group => group.Key, group => group.Select(book => new {
                            BookId = book.BookId,
                            Title = book.Title,
                            Author = book.Author,
                            Price = book.Price,
                            Cover = book.Cover
                        }).ToList());

                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetBookBy/{id}")]

        public IActionResult GetBook(int id)
        {
            using (var context = new bookshopContext())
            {
                try
                {
                    return Ok(context.Books.Where(cx =>cx.BookId==id).ToList());
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }

            }
        }

        [HttpGet("Genre_book/{id}")]

        public IActionResult Getgenre(int id)
        {
            using (var context = new bookshopContext())
            {
                try
                {
                    return Ok(context.Books.Where(v=>v.GenreId==id).ToList());
                }
                catch (Exception ex)
                {
                    return BadRequest(BadRequest(ex.Message));
                }
            }
        }


        [HttpPost("New_book_add")]

        public IActionResult Post([FromBody] Book book )
        {
            using (var context = new bookshopContext())
            {
                try
                {
                    context.Books.Add(book);
                    context.SaveChanges();
                    return Ok("Új könyv sikeresen rögzítve!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

       

        [HttpPut("UpdateBook")]

        public IActionResult PutUpdateBook([FromBody] Book book)
        {
            using (var context=new bookshopContext())
            {
                try
                {
                    context.Books.Update(book);
                    context.SaveChanges();
                    return StatusCode(200, "Könyv adatainak módosítása sikeresen megtörtént");

                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                    
                }
            }
        }


        [HttpDelete("id")]
        public IActionResult DeleteBook(int id)
        {
            using(var context=new bookshopContext())
            {
                try
                {
                    Book book = new Book();
                    book.BookId = id;
                    context.Books.Remove(book); context.SaveChanges();
                    return StatusCode(201, "A kiválasztott könyv törlése sikeresen megtörtént!");

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
