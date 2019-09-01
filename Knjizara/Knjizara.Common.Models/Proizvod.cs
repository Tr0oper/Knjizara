using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Knjizara.Common.Models
{
   [Table("Proizvodi")]
    public class Proizvod
    {
        public int ProizvodId { get; set; }
        public string Naziv { get; set; }
    }
}
