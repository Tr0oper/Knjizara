using Knjizara.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Knjizara.Common.Interfaces
{
    public interface IRacunRepository : IRepository<Racun>
    {
        Task<Racun> getRacunBySifraRacuna(int sifraRacuna);
        IQueryable getRacunaIStavki(int sifraRacuna);
        Task<IEnumerable<Object>> zaradaNaGodisnjemNivou(int godina);
        List<int> getSvihGodinaRacuna();
        object ukupnaZaradaZaGodinu(int godina);
        Task<IEnumerable<Object>> zaradaNaDnevnomNivou(DateTime dan);
        Task<IEnumerable<Racun>> dnevniRacuni(DateTime dan);
    }
}
