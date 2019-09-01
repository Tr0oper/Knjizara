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
    public class ProizvodRepository : Repository<Proizvod>, IProizvodRepository
    {
        private readonly KnjizaraContext _context;

        public ProizvodRepository(KnjizaraContext context) : base(context)
        {
            _context = context;
        }

        public KnjizaraContext context
        {
            get { return context as KnjizaraContext; }
        }
    }
}
