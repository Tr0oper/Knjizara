using Knjizara.Common.Interfaces;
using Knjizara.Common.Models;
using Knjizara.DAL.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Knjizara.DAL.RepoPattern
{
    public class RacunRepository : Repository<Racun>, IRacunRepository
    {
        private readonly KnjizaraContext _context;

        public RacunRepository(KnjizaraContext context) : base(context)
        {
            _context = context;
        }

        public KnjizaraContext context
        {
            get { return context as KnjizaraContext; }
        }

        public async Task<Racun> getRacunBySifraRacuna(int sifraRacuna)
        {
            return await _context.Racuni.Where(r => r.SifraRacuna == sifraRacuna).FirstOrDefaultAsync();
        }

        public IQueryable getRacunaIStavki(int sifraRacuna)
        {
            return  _context.Racuni.Where(r => r.SifraRacuna == sifraRacuna)
                .Join(_context.StavkeRacuna,
                    r => r.SifraRacuna, sr => sr.SifraRacuna,
                    (r, sr) => new
                    {
                        r.SifraRacuna,
                        r.VremeIzdavanja,
                        r.UkupanIznos,
                        sr.Barkod,
                        sr.CenaPoJedinici,
                        sr.Kolicina,
                        sr.StavkaRacunaId,
                        sr.VrstaProizvoda
                    }
                );
        }

        public async Task<IEnumerable<Object>> zaradaNaGodisnjemNivou(int godina)
        {
            
            return await _context.Racuni.Where(r => r.VremeIzdavanja.Year == godina)
                .GroupBy(x => x.VremeIzdavanja.Month)
                .Select(mo => new { Mesec = mo.Select(m => m.VremeIzdavanja.ToString("MMMMM", new CultureInfo("sr"))).FirstOrDefault(),
                                    Zarada = mo.Sum(m => m.UkupanIznos)}).ToListAsync();
        }

        public object ukupnaZaradaZaGodinu(int godina)
        {
            return _context.Racuni.Where(r => r.VremeIzdavanja.Year == godina)
                .GroupBy(x => x.VremeIzdavanja.Year)
                .Select(g => new
                {
                    Godina = g.Select(x => x.VremeIzdavanja.Year).FirstOrDefault(),
                    UkupnaZarada = g.Sum(x => x.UkupanIznos)
                }).ToList();
        }

        public List<int> getSvihGodinaRacuna()
        {
            return _context.Racuni.Select(r => r.VremeIzdavanja.Year).Distinct().ToList();
        }

        public async Task<IEnumerable<Object>> zaradaNaDnevnomNivou(DateTime dan)
        {
            var zarada = await _context.Racuni.Where(r => r.VremeIzdavanja.Day == dan.Day && r.VremeIzdavanja.Month == dan.Month && r.VremeIzdavanja.Year == dan.Year)
                .GroupBy(x => x.VremeIzdavanja.Day)
                .Select(g => new
                {
                    Dan = g.Select(x => x.VremeIzdavanja.Day).Distinct(),
                    Zarada = g.Sum(x => x.UkupanIznos)
                }).ToListAsync();

            return zarada;
        }

        public async Task<IEnumerable<Racun>> dnevniRacuni(DateTime dan)
        {
            var racuni = await _context.Racuni.Where(r => r.VremeIzdavanja.Day == dan.Day && r.VremeIzdavanja.Month == dan.Month && r.VremeIzdavanja.Year == dan.Year).ToListAsync();
                
            return racuni;
        }

        public async Task<IEnumerable<Object>> racuniPoSatu(DateTime dan)
        {
            var racuniDanas = await _context.Racuni.Where(r => r.VremeIzdavanja.Day == dan.Day && r.VremeIzdavanja.Month == dan.Month && r.VremeIzdavanja.Year == dan.Year)
                .GroupBy(r => r.VremeIzdavanja.Hour)
                .Select(g => new
                {
                    Sat = g.Select(x => x.VremeIzdavanja.Hour).Distinct(),
                    Zarada = g.Sum(x => x.UkupanIznos)
                }).ToListAsync();

            return racuniDanas;
        }
    }
}
