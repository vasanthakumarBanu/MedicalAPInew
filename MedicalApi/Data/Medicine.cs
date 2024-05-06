using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace MEDICALAPI
{
    public class Medicine
    {
        public int MedicineID { get; set; }
        public string MedicineName { get; set; }
        public int MedicineCount { get; set; }
        public DateTime MedicineExpriyDate { get; set; }
        public int MedicinePrice { get; set; }
    }
}