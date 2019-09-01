using Knjizara.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Knjizara.Common.Interfaces
{
    public interface IVrstaProizvodaRepository : IRepository<VrstaProizvoda>
    {
        Task<IEnumerable<VrstaProizvoda>> getVrsteProizvodaByProizvodId(int ProizvodId);
        double getCenaByBarkod(int barkod);
    }
}
