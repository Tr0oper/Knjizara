using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Knjizara.Common.Models;
using Knjizara.DAL.Context;
using Knjizara.Common.Interfaces;

namespace Knjizara.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StavkaRacunasController : ControllerBase
    {
        public IUnitOfWork _unitOfWork { get; }

        public StavkaRacunasController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/StavkaRacunas
        [HttpGet]
        public async Task<IEnumerable<StavkaRacuna>> GetStavkeRacuna()
        {
            return await _unitOfWork.StavkeRacuna.GetAllAsync();
        }

        // GET: api/StavkaRacunas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StavkaRacuna>> GetStavkaRacuna(int id)
        {
            var stavkaRacuna = await _unitOfWork.StavkeRacuna.GetAsync(id);

            if (stavkaRacuna == null)
            {
                return NotFound();
            }

            return stavkaRacuna;
        }

        // GET: api/StavkaRacunas/racun/SifraRacuna
        [HttpGet("racun/{SifraRacuna}")]
        public async Task<IEnumerable<StavkaRacuna>> getStavkeRacunaBySifraRacuna(int SifraRacuna)
        {
            return await _unitOfWork.StavkeRacuna.getStavkeRacunaBySifraRacuna(SifraRacuna);
        }

        // GET: api/StavkaRacunas/stavka/SifraRacuna
        [HttpGet("{SifraRacuna}/{Barkod}")]
        public async Task<StavkaRacuna> getStavkeByBarkod(int SifraRacuna, int Barkod)
        {
            return await _unitOfWork.StavkeRacuna.getStavkeByBarkod(SifraRacuna, Barkod);
        }

        // GET: api/StavkaRacunas/barkods/SifraRacuna
        [HttpGet("barkods/{sifraRacuna}")]
        public async Task<IEnumerable<int>> getSvihBarkodova(int sifraRacuna)
        {
            return await _unitOfWork.StavkeRacuna.getSvihBarkodova(sifraRacuna);
        }

        // PUT: api/StavkaRacunas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStavkaRacuna(int id, StavkaRacuna stavkaRacuna)
        {
            // uzima se stavka pre nego sto dobije nove podatke, kako bi mogla da se izbrise pre nego sto se put-uje nova
            // kako u bazi za 1 racun ne bi postojala i stara i nova stavka
            var staraStavka = await _unitOfWork.StavkeRacuna.GetAsync(id);

            var racunStavke = await _unitOfWork.Racuni.getRacunBySifraRacuna(staraStavka.SifraRacuna);
            var vrstaProizvoda = _unitOfWork.StavkeRacuna.getVrstePoBarkodu(stavkaRacuna.Barkod);

            stavkaRacuna.VrstaProizvoda = _unitOfWork.StavkeRacuna.getVrstePoBarkodu(stavkaRacuna.Barkod);
            stavkaRacuna.StavkaRacunaId = id;
            stavkaRacuna.CenaPoJedinici = stavkaRacuna.VrstaProizvoda.Cena;
            if (id != stavkaRacuna.StavkaRacunaId)
            {
                return BadRequest();
            }


            if (staraStavka.Kolicina < stavkaRacuna.Kolicina)
            {
                var pom = Math.Round(((stavkaRacuna.Kolicina - staraStavka.Kolicina) * stavkaRacuna.CenaPoJedinici),2);
                stavkaRacuna.Racun = racunStavke;
                stavkaRacuna.Racun.UkupanIznos += pom;
                _unitOfWork.StavkeRacuna.Remove(staraStavka);
                _unitOfWork.StavkeRacuna.Update(stavkaRacuna);

                if ((stavkaRacuna.Kolicina - staraStavka.Kolicina) > vrstaProizvoda.Kolicina)
                    return BadRequest();
                else
                {
                    vrstaProizvoda.Kolicina -= (stavkaRacuna.Kolicina - staraStavka.Kolicina);
                        if (vrstaProizvoda.Kolicina < 0)
                        return BadRequest();
                }

            }
            else if (staraStavka.Kolicina > stavkaRacuna.Kolicina)
            {
                var pom = Math.Round(((staraStavka.Kolicina - stavkaRacuna.Kolicina) * stavkaRacuna.CenaPoJedinici),2);
                stavkaRacuna.Racun = racunStavke;
                stavkaRacuna.Racun.UkupanIznos -= pom;
                _unitOfWork.StavkeRacuna.Remove(staraStavka);
                _unitOfWork.StavkeRacuna.Update(stavkaRacuna);
                vrstaProizvoda.Kolicina += (staraStavka.Kolicina - stavkaRacuna.Kolicina);
            }

            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StavkaRacunaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStavkaRacuna", new { id = stavkaRacuna.StavkaRacunaId }, stavkaRacuna);
        }

        // POST: api/StavkaRacunas
        [HttpPost]
        public async Task<ActionResult<StavkaRacuna>> PostStavkaRacuna(StavkaRacuna stavkaRacuna)
        {
            stavkaRacuna.VrstaProizvoda = _unitOfWork.StavkeRacuna.getVrstePoBarkodu(stavkaRacuna.Barkod);
            stavkaRacuna.CenaPoJedinici = stavkaRacuna.VrstaProizvoda.Cena;
            var vrstaProizvoda = _unitOfWork.StavkeRacuna.getVrstePoBarkodu(stavkaRacuna.Barkod);

            if (RacunExsits(stavkaRacuna.SifraRacuna))
            {
                _unitOfWork.StavkeRacuna.UpdateCeneRacuna(stavkaRacuna);
            }
            else
            {
                Racun r = new Racun();
                r.SifraRacuna = stavkaRacuna.SifraRacuna;
                r.UkupanIznos = stavkaRacuna.CenaPoJedinici * stavkaRacuna.Kolicina;
                r.VremeIzdavanja = DateTime.Now;
                _unitOfWork.Racuni.Add(r);
            }
            
            _unitOfWork.StavkeRacuna.Add(stavkaRacuna);

            _unitOfWork.StavkeRacuna.UpdateVrsteProizvoda(stavkaRacuna);

            if (vrstaProizvoda.Kolicina < 0)
            {
                return BadRequest();
            }

            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
                

            return CreatedAtAction("GetStavkaRacuna", new { id = stavkaRacuna.StavkaRacunaId }, stavkaRacuna);
        }

        // DELETE: api/StavkaRacunas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StavkaRacuna>> DeleteStavkaRacuna(int id)
        {
            var stavkaRacuna = await _unitOfWork.StavkeRacuna.GetAsync(id);
            if (stavkaRacuna == null)
            {
                return NotFound();
            }

            _unitOfWork.StavkeRacuna.UpdateCeneRacunaDeleteStavke(stavkaRacuna);
            _unitOfWork.StavkeRacuna.Remove(stavkaRacuna);
            await _unitOfWork.SaveChangesAsync();

            return stavkaRacuna;
        }

        private bool StavkaRacunaExists(int id)
        {
            bool isNull = true;
            var stavkaRacuna = _unitOfWork.StavkeRacuna.Get(id);
            if (stavkaRacuna != null)
                isNull = false;

            return isNull ? false : true;
        }

        private bool RacunExsits(int id)
        {
            bool isNull = true;
            var racun = _unitOfWork.Racuni.Get(id);
            if (racun != null)
                isNull = false;

            return isNull ? false : true;
        }
    }
}
