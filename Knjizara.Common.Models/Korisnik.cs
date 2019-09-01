using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Knjizara.Common.Models
{
    [Table("Korisnici")]
    public class Korisnik
    {
        public int KorisnikId { get; set; }
        public string KorisnickoIme { get; set; }
        public string Mail { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Lozinka { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public string Pol { get; set; }
        public string Telefon { get; set; }
        public double Plata { get; set; }

        public int RolaId { get; set; }
        public virtual Rola Rola { get; set; }
    }
}
