using Knjizara.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Knjizara.Common.Interfaces
{
    public interface IStavkaRacunaRepository : IRepository<StavkaRacuna>
    {
        Task<IEnumerable<StavkaRacuna>> getStavkeRacunaBySifraRacuna(int SifraRacuna);
        void UpdateCeneRacuna(StavkaRacuna stavkaRacuna);
        void UpdateVrsteProizvoda(StavkaRacuna stavkaRacuna);
        void UpdateCeneRacunaDeleteStavke(StavkaRacuna stavkaRacuna);
        VrstaProizvoda getVrstePoBarkodu(int barkod);
        Task<StavkaRacuna> getStavkeByBarkod(int SifraRacuna, int Barkod);
        Task<IEnumerable<int>> getSvihBarkodova(int sifraRacuna);
    }
}
