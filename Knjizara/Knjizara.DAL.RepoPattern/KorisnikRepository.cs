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
    public class KorisnikRepository : Repository<Korisnik>, IKorisnikRepository
    {
        private readonly KnjizaraContext _context;

        public KorisnikRepository(KnjizaraContext context) : base(context)
        {
            _context = context;
        }

        public KnjizaraContext context
        {
            get { return context as KnjizaraContext; }
        }

        public async Task<Korisnik> logovanje(Korisnik korisnik)
        {
            return await _context.Korisnici.Where(k => string.Equals(k.KorisnickoIme, korisnik.KorisnickoIme, StringComparison.CurrentCulture) && string.Equals(k.Lozinka, korisnik.Lozinka, StringComparison.CurrentCulture)).FirstOrDefaultAsync();
        }
    }
}
