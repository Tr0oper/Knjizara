using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Knjizara.Common.Models
{
    [Table("VrsteProizvoda")]
    public class VrstaProizvoda
    {
        [Key]
        public int Barkod { get; set; }
        public string Naziv { get; set; }
        public double Cena { get; set; }
        public int Kolicina { get; set; }
        public string Proizvodjac { get; set; }
        public string ZemljaPorekla { get; set; }

        public int ProizvodId { get; set; }
        public virtual Proizvod Proizvod { get; set; }
    }
}
