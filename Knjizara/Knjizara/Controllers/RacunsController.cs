﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Knjizara.Common.Models;
using Knjizara.DAL.Context;
using Knjizara.Common.Interfaces;
using System.Web.Http;

namespace Knjizara.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RacunsController : ControllerBase
    {
        public IUnitOfWork _unitOfWork { get; }

        public RacunsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Racuns
        [HttpGet]
        public async Task<IEnumerable<Racun>> GetRacuni()
        {
            return await _unitOfWork.Racuni.GetAllAsync();
        }

        // GET: api/Racuns/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Racun>> GetRacun(int id)
        {
            var racun = await _unitOfWork.Racuni.GetAsync(id);

            if (racun == null)
            {
                return NotFound();
            }

            return racun;
        }

        // GET: api/Racuns/sifraRacuna
        [HttpGet("detalji/{sifraRacuna}")]
        public IQueryable getRacunaIStavki(int sifraRacuna)
        {
            return _unitOfWork.Racuni.getRacunaIStavki(sifraRacuna);
        }

        // PUT: api/Racuns/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRacun(int id, Racun racun)
        {
            if (id != racun.SifraRacuna)
            {
                return BadRequest();
            }

            racun.VremeIzdavanja = DateTime.Now;
            _unitOfWork.Racuni.Update(racun);

            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RacunExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRacun", new { id = racun.SifraRacuna }, racun);
        }

        // POST: api/Racuns
        [HttpPost]
        public async Task<ActionResult<Racun>> PostRacun(Racun racun)
        {
            racun.VremeIzdavanja = DateTime.Now;
            racun.UkupanIznos = 0;
            _unitOfWork.Racuni.Add(racun);
            await _unitOfWork.SaveChangesAsync();

            return CreatedAtAction("GetRacun", new { id = racun.SifraRacuna }, racun);
        }

        // DELETE: api/Racuns/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Racun>> DeleteRacun(int id)
        {
            var racun = await _unitOfWork.Racuni.GetAsync(id);
            if (racun == null)
            {
                return NotFound();
            }

            _unitOfWork.Racuni.Remove(racun);
            await _unitOfWork.SaveChangesAsync();

            return racun;
        }

        private bool RacunExists(int id)
        {
            bool isNull = true;
            var racun = _unitOfWork.Racuni.Get(id);
            if (racun != null)
                isNull = false;

            return isNull ? false : true;
        }
    }
}
