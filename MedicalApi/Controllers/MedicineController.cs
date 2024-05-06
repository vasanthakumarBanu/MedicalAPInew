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
    public class MedicineController : ControllerBase
    {
        private static List<Medicine> _Medicine = new List<Medicine>
        {
            //ADD more MedicineInfo here if Needed
            new Medicine{ MedicineID  = 1001, MedicineName = "Paracetomol", MedicineCount = 5, MedicineExpriyDate = new DateTime(2024, 9, 11),MedicinePrice = 50 },
            new Medicine{ MedicineID  = 1002, MedicineName = "Colpal", MedicineCount = 15, MedicineExpriyDate = new DateTime(2024, 11, 1),MedicinePrice = 60 },
            new Medicine{ MedicineID  = 1003, MedicineName = "Stepsil", MedicineCount = 12, MedicineExpriyDate = new DateTime(2024, 4, 21),MedicinePrice = 70 },
            new Medicine{ MedicineID  = 1004, MedicineName = "Iodex", MedicineCount = 54, MedicineExpriyDate = new DateTime(2023, 2, 23),MedicinePrice = 80 },
            new Medicine{ MedicineID  = 1005, MedicineName = "Acethrol", MedicineCount = 24, MedicineExpriyDate = new DateTime(2024, 5, 15),MedicinePrice = 90 },
        };
         //GET : api/User
        [HttpGet]
        public IActionResult GetMedicine()
        {
           return Ok(_Medicine);
        }
        //GET:api/User 
        [HttpGet("{id}")]

        public IActionResult GetMedicine(int id)
        {
            var medicine = _Medicine.Find(m => m.MedicineID == id);
            if(medicine == null)
        {
            return NotFound();
        }
        return Ok(medicine);
        }
        //Adding a new user
        //Post: api/User/1
        [HttpDelete("{id}")]
        public IActionResult PostMedicine([FromBody] Medicine medicine)
        {
            _Medicine.Add(medicine);
            //You migth want to return CreatedAtAction or another appropriate response
        return Ok();
        }
        //Updating an Exisitng medicine
        //Put: api/User/1
        [HttpDelete("{id}")]
         public IActionResult PutMedicine(int id,[FromBody] Medicine medicine)
       {
        var index = _Medicine.FindIndex(m => m.MedicineID == id);
        if(index < 0)
        {
            return NotFound();
        }
        _Medicine[index] = medicine;
        //You might want to return NoContent or another appropriate response
        return Ok();
       }
       //Deleting an existing medince
       //DELETE: api/Medicine/1
       [HttpDelete("{id}")]
       public IActionResult DeleteMedicine(int id)
       {
        var medicine = _Medicine.Find(m => m.MedicineID == id);
        if(medicine == null)
        {
            return NotFound();
        }
        _Medicine.Remove(medicine);
        //You might want to return No COntent or anotther appropritate reponse
        return Ok();
       }
        
    }
}