using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MEDICALAPI;

namespace MEDICALAPI.controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private static List<Order> _Order = new List<Order>
        {
            //Add more oder here if needed
            new Order { OrderID=10, UserID = 1001 , MedicineID = 1001 ,MedicineName = "Paracetomal" , MedicineCount = 10 , MedicineExpiryDate = new DateTime(2024,12,01), TotalAmount = 120 ,  OderStatus = "Odered"}
        };
        //Get : api/Order
        [HttpGet]

        public IActionResult GetOrder()
        {
             return Ok(_Order);
        }
         //GET:api/Order 
        [HttpGet("{id}")]

        public IActionResult GetOrder(int id)
        {
            var order = _Order.Find(m => m.OrderID == id);
            if(order == null)
        {
            return NotFound();
        }
        return Ok(order);
        }
        //Adding a new order
        //Post: api/Order/1
        [HttpDelete("{id}")]
        public IActionResult PostOrder([FromBody] Order order)
        {
            _Order.Add(order);
            //You migth want to return CreatedAtAction or another appropriate response
        return Ok();
        }
        //Updating an Exisitng order
        //Put: api/Order/1
        [HttpDelete("{id}")]
         public IActionResult PutOrder(int id,[FromBody] Order order)
       {
        var index = _Order.FindIndex(m => m.OrderID == id);
        if(index < 0)
        {
            return NotFound();
        }
        _Order[index] = order;
        //You might want to return NoContent or another appropriate response
        return Ok();
       }
       //Deleting an existing Order
       //DELETE: api/Order/1
       [HttpDelete("{id}")]
       public IActionResult DeleteOrder(int id)
       {
        var order = _Order.Find(m => m.OrderID == id);
        if(order == null)
        {
            return NotFound();
        }
        _Order.Remove(order);
        //You might want to return No COntent or anotther appropritate reponse
        return Ok();
       }
    }
}