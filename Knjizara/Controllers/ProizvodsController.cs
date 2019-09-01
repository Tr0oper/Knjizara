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
using Microsoft.AspNetCore.Authorization;

namespace Knjizara.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProizvodsController : ControllerBase
    {
        public IUnitOfWork _unitOfWork { get; }

        public ProizvodsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Proizvods
        [HttpGet]
        public async Task<IEnumerable<Proizvod>> GetProizvodi()
        {
            return await _unitOfWork.Proizvodi.GetAllAsync();
        }

        // GET: api/Proizvods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Proizvod>> GetProizvod(int id)
        {
            var proizvod = await _unitOfWork.Proizvodi.GetAsync(id);

            if (proizvod == null)
            {
                return NotFound();
            }

            return proizvod;
        }

        // PUT: api/Proizvods/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProizvod(int id, Proizvod proizvod)
        {
            if (id != proizvod.ProizvodId)
            {
                return BadRequest();
            }

            _unitOfWork.Proizvodi.Update(proizvod);

            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProizvodExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProizvod", new { id = proizvod.ProizvodId }, proizvod);
        }

        // POST: api/Proizvods
        [HttpPost]
        public async Task<ActionResult<Proizvod>> PostProizvod(Proizvod proizvod)
        {
            if (ProizvodExists(proizvod.ProizvodId))
            {
                return BadRequest();
            }
            else
            {
                _unitOfWork.Proizvodi.Add(proizvod);
                await _unitOfWork.SaveChangesAsync();

                return CreatedAtAction("GetProizvod", new { id = proizvod.ProizvodId }, proizvod);
            }
        }

        // DELETE: api/Proizvods/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Proizvod>> DeleteProizvod(int id)
        {
            var proizvod = await _unitOfWork.Proizvodi.GetAsync(id);
            if (proizvod == null)
            {
                return NotFound();
            }

            _unitOfWork.Proizvodi.Remove(proizvod);
            await _unitOfWork.SaveChangesAsync();

            return proizvod;
        }

        private bool ProizvodExists(int id)
        {
            bool isNull = true;
            var proizvod = _unitOfWork.Proizvodi.Get(id);
            if (proizvod != null)
                isNull = false;

            return isNull ? false : true;
        }
    }
}
