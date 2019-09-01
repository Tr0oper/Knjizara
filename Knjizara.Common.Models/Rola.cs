using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Knjizara.Common.Models
{
    [Table("Role")]
    public class Rola
    {
        public int RolaId { get; set; }
        public string Naziv { get; set; }
    }
}
