using BookShopWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookShopWebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        [HttpGet("GetOrders")]
        public IActionResult GetOrders()
        {
            using (var context =new bookshopContext())
            {
                try
                {
                    return Ok(context.Orders.ToList());
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpGet("GetOrderBy/{id}")]
        public IActionResult GetOrder(int id)
        {
            using (var context = new bookshopContext())
            {
                try
                {
                    return Ok(context.Orders.Where(cx => cx.Id == id).ToList());
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpPost("PostOrders")]
        public IActionResult Orders([FromBody] Order order)
        {
            using (var context = new bookshopContext())
            {
                try
                {
                    context.Orders.Add(order);
                    context.SaveChanges();
                    return Ok("Sikeres rendelés!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpPut("UpdateOrder")]
        public IActionResult PutOrders([FromBody] Order order)
        {
            using (var context =new bookshopContext())
            {
                try
                {
                    context.Orders.Update(order);
                    context.SaveChanges();
                    return StatusCode(201, "Sikeres Módosítás");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpDelete("DeleteOrder/(id)")]
        public IActionResult DeleteOrder(int id)
        {
            using (var context=new bookshopContext())
            {
                try
                {
                    Order order = new Order();
                    order.Id = id;
                    context.Orders.Remove(order);
                    context.SaveChanges();
                    return StatusCode(201, "Sikeres törlés!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
