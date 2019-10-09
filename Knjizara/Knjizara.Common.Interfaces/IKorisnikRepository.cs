using Knjizara.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Knjizara.Common.Interfaces
{
    public interface IKorisnikRepository : IRepository<Korisnik>
    {
        Task<Korisnik> logovanje(Korisnik korisnik);
        int poslednjiId();
    }
}
