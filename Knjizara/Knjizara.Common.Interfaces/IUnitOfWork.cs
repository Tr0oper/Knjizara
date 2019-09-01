using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Knjizara.Common.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IProizvodRepository Proizvodi { get; }
        IVrstaProizvodaRepository VrsteProizvoda { get; }
        IRacunRepository Racuni { get; }
        IStavkaRacunaRepository StavkeRacuna { get; }
        IKorisnikRepository Korisnici { get; }
        IRolaRepository Role { get; }
        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
