using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MEDICALAPI;
using Microsoft.AspNetCore.Mvc;

namespace MEDICALAPI.controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController:ControllerBase
    {
        private static List<User> _User = new List<User>
        {
            //ADD more User here if Needed
            new User{ UserID = 1001, UserName = "Ravi", UserAge = 25 ,UserPhoneNumber = "9994992745" ,UserEmailId="khdsiuvb@gmail.com" , Balance = 1000 },
            new User{ UserID = 1002, UserName = "Bharani", UserAge = 27 ,UserPhoneNumber = "8110877339" ,UserEmailId="khdsaerbgarbiuvb@gmail.com" , Balance = 2000 },
        };
         //GET : api/User
        [HttpGet]
        public IActionResult GetUser()
        {
           return Ok(_User);
        }
        //GET:api/User 
        [HttpGet("{id}")]

        public IActionResult GetUser(int id)
        {
            var user = _User.Find(m => m.UserID == id);
            if(user == null)
        {
            return NotFound();
        }
        return Ok(user);
        }
        //Adding a new user
        //Post: api/User/1
        [HttpDelete("{id}")]
        public IActionResult PostUser([FromBody] User user)
        {
            _User.Add(user);
            //You migth want to return CreatedAtAction or another appropriate response
        return Ok();
        }
        //Updating an Exisitng medicine
        //Put: api/User/1
        [HttpDelete("{id}")]
         public IActionResult PutUser(int id,[FromBody] User user)
       {
        var index = _User.FindIndex(m => m.UserID == id);
        if(index < 0)
        {
            return NotFound();
        }
        _User[index] = user;
        //You might want to return NoContent or another appropriate response
        return Ok();
       }
       //Deleting an existing medince
       //DELETE: api/Contacts/1
       [HttpDelete("{id}")]
       public IActionResult DeleteContact(int id)
       {
        var user = _User.Find(m => m.UserID == id);
        if(user == null)
        {
            return NotFound();
        }
        _User.Remove(user);
        //You might want to return No COntent or anotther appropritate reponse
        return Ok();
       }






    }
}