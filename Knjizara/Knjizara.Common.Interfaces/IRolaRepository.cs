using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Knjizara.Common.Models;

namespace Knjizara.Common.Interfaces
{
    public interface IRolaRepository : IRepository<Rola>
    {
        Task<IEnumerable<Korisnik>> getKorisnikaByRolaId(int rolaId);
    }
}
