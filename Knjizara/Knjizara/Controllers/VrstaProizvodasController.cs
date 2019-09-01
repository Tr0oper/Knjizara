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
    public class VrstaProizvodasController : ControllerBase
    {
        public IUnitOfWork _unitOfWork { get; }

        public VrstaProizvodasController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/VrstaProizvodas
        [HttpGet]
        public async Task<IEnumerable<VrstaProizvoda>> GetVrsteProizvoda()
        {
            return await _unitOfWork.VrsteProizvoda.GetAllAsync();
        }

        // GET: api/VrstaProizvodas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VrstaProizvoda>> GetVrstaProizvoda(int id)
        {
            var vrstaProizvoda = await _unitOfWork.VrsteProizvoda.GetAsync(id);

            if (vrstaProizvoda == null)
            {
                return NotFound();
            }

            return vrstaProizvoda;
        }

        // GET: api/VrstaProizvodas/proizvod
        [HttpGet("proizvod/{ProizvodId}")]
        public async Task<IEnumerable<VrstaProizvoda>> getVrsteProizvodaByProizvodId(int ProizvodId)
        {
            return await _unitOfWork.VrsteProizvoda.getVrsteProizvodaByProizvodId(ProizvodId);
        }

        // GET: api/VrstaProizvodas/vrsta
        [HttpGet("vrsta/{barkod}")]
        public double getCenaByBarkod(int barkod)
        {
            return _unitOfWork.VrsteProizvoda.getCenaByBarkod(barkod);
        }

        // PUT: api/VrstaProizvodas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVrstaProizvoda(int id, VrstaProizvoda vrstaProizvoda)
        {
            if (id != vrstaProizvoda.Barkod)
            {
                return BadRequest();
            }

            _unitOfWork.VrsteProizvoda.Update(vrstaProizvoda);

            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VrstaProizvodaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetVrstaProizvoda", new { id = vrstaProizvoda.Barkod }, vrstaProizvoda);
        }

        // POST: api/VrstaProizvodas
        [HttpPost]
        public async Task<ActionResult<VrstaProizvoda>> PostVrstaProizvoda(VrstaProizvoda vrstaProizvoda)
        {
            if (VrstaProizvodaExists(vrstaProizvoda.Barkod))
            {
                return BadRequest();
            }
            else
            {
                _unitOfWork.VrsteProizvoda.Add(vrstaProizvoda);
                await _unitOfWork.SaveChangesAsync();
            }

            return CreatedAtAction("GetVrstaProizvoda", new { id = vrstaProizvoda.Barkod }, vrstaProizvoda);
        }

        // DELETE: api/VrstaProizvodas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<VrstaProizvoda>> DeleteVrstaProizvoda(int id)
        {
            var vrstaProizvoda = await _unitOfWork.VrsteProizvoda.GetAsync(id);
                      
            if (vrstaProizvoda == null)
            {
                return NotFound();
            }

            //var stavkaRacuna = await _unitOfWork.VrsteProizvoda.getStavkeByBarkod(vrstaProizvoda.Barkod);
            //var racunVrsteProizvoda = await _unitOfWork.Racuni.getRacunBySifraRacuna(stavkaRacuna.SifraRacuna);
            //racunVrsteProizvoda.UkupanIznos -= stavkaRacuna.Kolicina * stavkaRacuna.CenaPoJedinici;

            _unitOfWork.VrsteProizvoda.Remove(vrstaProizvoda);
            await _unitOfWork.SaveChangesAsync();

            return vrstaProizvoda;
        }

        private bool VrstaProizvodaExists(int id)
        {
            bool isNull = true;
            var vrstaProizvoda = _unitOfWork.VrsteProizvoda.Get(id);
            if (vrstaProizvoda != null)
                isNull = false;

            return isNull ? false : true;
        }
    }
}
