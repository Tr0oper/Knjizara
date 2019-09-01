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
    public class StavkaRacunaRepository : Repository<StavkaRacuna>, IStavkaRacunaRepository
    {
        private readonly KnjizaraContext _context;

        public StavkaRacunaRepository(KnjizaraContext context) : base(context)
        {
            _context = context;
        }

        public KnjizaraContext context
        {
            get { return context as KnjizaraContext; }
        }

        public async Task<IEnumerable<StavkaRacuna>> getStavkeRacunaBySifraRacuna(int SifraRacuna)
        {
            var stavke = await _context.StavkeRacuna.Where(sr => sr.SifraRacuna == SifraRacuna).ToListAsync();

            return stavke;
        }

        public void UpdateCeneRacuna(StavkaRacuna stavkaRacuna)
        {
            var stariRacun = _context.Racuni.Where(r => r.SifraRacuna == stavkaRacuna.SifraRacuna).FirstOrDefault();

            stariRacun.UkupanIznos += Math.Round((stavkaRacuna.CenaPoJedinici * stavkaRacuna.Kolicina), 2);
            stariRacun.VremeIzdavanja = DateTime.Now;
        }

        public void UpdateCeneRacunaDeleteStavke(StavkaRacuna stavkaRacuna)
        {
            var stariRacun = _context.Racuni.Where(r => r.SifraRacuna == stavkaRacuna.SifraRacuna).FirstOrDefault();

            stariRacun.UkupanIznos -= Math.Round((stavkaRacuna.CenaPoJedinici * stavkaRacuna.Kolicina), 2);
            stariRacun.VremeIzdavanja = DateTime.Now;
        }


        public void UpdateVrsteProizvoda(StavkaRacuna stavkaRacuna)
        {
            var staraVrsta = _context.VrsteProizvoda.Where(vp => vp.Barkod == stavkaRacuna.Barkod).FirstOrDefault();
            staraVrsta.Kolicina -= stavkaRacuna.Kolicina;

        }

        public VrstaProizvoda getVrstePoBarkodu(int barkod)
        {
            var pom = _context.VrsteProizvoda.Where(vp => vp.Barkod == barkod).FirstOrDefault();
            return pom;
        }

        public async Task<StavkaRacuna> getStavkeByBarkod(int SifraRacuna, int Barkod)
        {
            var stavka = await _context.StavkeRacuna.Where(x => x.Barkod == Barkod && x.SifraRacuna == SifraRacuna).FirstOrDefaultAsync();
            return stavka;
        }

        public async Task<IEnumerable<int>> getSvihBarkodova(int sifraRacuna)
        {
            return await _context.StavkeRacuna.Where(vp => vp.SifraRacuna == sifraRacuna).Select(vp => vp.Barkod).ToListAsync();
        }
    }
}
