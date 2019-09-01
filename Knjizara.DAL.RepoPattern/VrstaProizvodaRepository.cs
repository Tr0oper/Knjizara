using Knjizara.Common.Interfaces;
using Knjizara.Common.Models;
using Knjizara.DAL.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Knjizara.DAL.RepoPattern
{
    public class VrstaProizvodaRepository : Repository<VrstaProizvoda>, IVrstaProizvodaRepository
    {
        private readonly KnjizaraContext _context;

        public VrstaProizvodaRepository(KnjizaraContext context) : base(context)
        {
            _context = context;
        }

        public KnjizaraContext context
        {
            get { return context as KnjizaraContext; }
        }

        public async Task<IEnumerable<VrstaProizvoda>> getVrsteProizvodaByProizvodId(int ProizvodId)
        {
            return await _context.VrsteProizvoda.Where(vp => vp.ProizvodId == ProizvodId).ToListAsync();
        }

        public double getCenaByBarkod(int barkod)
        {
            return _context.VrsteProizvoda.Where(vp => vp.Barkod == barkod).Select(x => x.Cena).FirstOrDefault();
        }
    }
}
