using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Knjizara.Common.Models
{
    [Table("Racuni")]
    public class Racun
    {
        [Key]
        public int SifraRacuna { get; set; }
        public DateTime VremeIzdavanja { get; set; }
        public double UkupanIznos { get; set; }
    }
}
