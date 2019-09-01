using Knjizara.Common.Interfaces;
using Knjizara.Common.Models;
using Knjizara.DAL.Context;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Knjizara.DAL.RepoPattern
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly KnjizaraContext context;

        public IProizvodRepository Proizvodi { get; }
        public IVrstaProizvodaRepository VrsteProizvoda { get; set; }
        public IRacunRepository Racuni { get; set; }
        public IStavkaRacunaRepository StavkeRacuna { get; set; }
        public IKorisnikRepository Korisnici { get; set; }
        public IRolaRepository Role { get; set; }

        public UnitOfWork(KnjizaraContext context)
        {
            this.context = context;
            Proizvodi = new ProizvodRepository(context);
            VrsteProizvoda = new VrstaProizvodaRepository(context);
            Racuni = new RacunRepository(context);
            StavkeRacuna = new StavkaRacunaRepository(context);
            Korisnici = new KorisnikRepository(context);
            Role = new RolaRepository(context);

        }

        public void Dispose()
        {
            context.Dispose();
        }

        public int SaveChanges()
        {
            return context.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await context.SaveChangesAsync();
        }
    }
}
