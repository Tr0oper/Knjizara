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
    public class RolaRepository : Repository<Rola>, IRolaRepository
    {
        private readonly KnjizaraContext _context;

        public RolaRepository(KnjizaraContext context) : base(context)
        {
            _context = context;
        }

        public KnjizaraContext context
        {
            get { return context as KnjizaraContext; }
        }

        public async Task<IEnumerable<Korisnik>> getKorisnikaByRolaId(int rolaId)
        {
            return await _context.Korisnici.Where(k => k.RolaId == rolaId).ToListAsync();
        }
    }
}
