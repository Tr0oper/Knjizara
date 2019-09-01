using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Knjizara.Common.Models
{
    [Table("StavkeRacuna")]
    public class StavkaRacuna
    {
        public int StavkaRacunaId { get; set; }
        public int Kolicina { get; set; }
        public double CenaPoJedinici { get; set; }

        public int Barkod { get; set; }
        public virtual VrstaProizvoda VrstaProizvoda { get; set; }

        public int SifraRacuna { get; set; }
        public virtual Racun Racun { get; set; }
    }
}
