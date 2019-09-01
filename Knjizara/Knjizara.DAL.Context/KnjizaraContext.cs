using Knjizara.Common.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Knjizara.DAL.Context
{
   public class KnjizaraContext :DbContext
    {
        public KnjizaraContext(DbContextOptions<KnjizaraContext> options) : base(options)
        {

        }

        public DbSet<Proizvod> Proizvodi { get; set; }
        public DbSet<VrstaProizvoda> VrsteProizvoda { get; set; }
        public DbSet<Racun> Racuni { get; set; }
        public DbSet<StavkaRacuna> StavkeRacuna { get; set; }
        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Rola> Role { get; set; }
    }
}
