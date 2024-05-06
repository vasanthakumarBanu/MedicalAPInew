using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace MEDICALAPI
{
    public class Order
    {
           public int  OrderID {get;set;}
           public int UserID {get;set;}
           public int MedicineID {get;set;}
           public string MedicineName {get;set;}
           public int MedicineCount {get;set;}
           public DateTime MedicineExpiryDate {get;set;}
           public int TotalAmount {get;set;}
           public string OderStatus {get;set;}
    }
}
