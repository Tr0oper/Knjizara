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
    public class RolasController : ControllerBase
    {
        public IUnitOfWork _unitOfWork { get; }

        public RolasController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Rolas
        [HttpGet]
        public async Task<IEnumerable<Rola>> GetRole()
        {
            return await _unitOfWork.Role.GetAllAsync();
        }

        // GET: api/Rolas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rola>> GetRola(int id)
        {
            var rola = await _unitOfWork.Role.GetAsync(id);

            if (rola == null)
            {
                return NotFound();
            }

            return rola;
        }

        // GET: api/Rolas/korisnik/rolaId
        [HttpGet("korisnik/{rolaId}")]
        public async Task<IEnumerable<Korisnik>> getKorisnikaByRolaId(int rolaId)
        {
            return await _unitOfWork.Role.getKorisnikaByRolaId(rolaId);
        }

        // PUT: api/Rolas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRola(int id, Rola rola)
        {
            if (id != rola.RolaId)
            {
                return BadRequest();
            }

            _unitOfWork.Role.Update(rola);

            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRola", new { id = rola.RolaId }, rola);
        }

        // POST: api/Rolas
        [HttpPost]
        public async Task<ActionResult<Rola>> PostRola(Rola rola)
        {
            if (RolaExists(rola.RolaId))
            {
                return BadRequest();
            }
            else
            {
                _unitOfWork.Role.Add(rola);
                await _unitOfWork.SaveChangesAsync();

                return CreatedAtAction("GetRola", new { id = rola.RolaId }, rola);
            }
        }

        // DELETE: api/Rolas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Rola>> DeleteRola(int id)
        {
            var rola = await _unitOfWork.Role.GetAsync(id);
            if (rola == null)
            {
                return NotFound();
            }

            _unitOfWork.Role.Remove(rola);
            await _unitOfWork.SaveChangesAsync();

            return rola;
        }

        private bool RolaExists(int id)
        {
            bool isNull = true;
            var rola = _unitOfWork.Role.Get(id);
            if (rola != null)
                isNull = false;

            return isNull ? false : true;
        }
    }
}
