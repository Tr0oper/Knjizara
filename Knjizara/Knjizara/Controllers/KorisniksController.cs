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
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace Knjizara.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KorisniksController : ControllerBase
    {
        public IUnitOfWork _unitOfWork { get; }

        public KorisniksController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Korisniks
        [HttpGet]
        public async Task<IEnumerable<Korisnik>> GetKorisnici()
        {
            return await _unitOfWork.Korisnici.GetAllAsync();
        }

        // GET: api/Korisniks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Korisnik>> GetKorisnik(int id)
        {
            var korisnik = await _unitOfWork.Korisnici.GetAsync(id);
            var rola = await _unitOfWork.Role.GetAsync(korisnik.RolaId);
            korisnik.Rola = rola;

            if (korisnik == null)
            {
                return NotFound();
            }

            return korisnik;
        }

        // GET: api/Korisniks/maxId
        [HttpGet("max")]
        public int MaxIdKorisnika()
        {
            return _unitOfWork.Korisnici.poslednjiId();
        }

        // PUT: api/Korisniks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKorisnik(int id, Korisnik korisnik)
        {
            var rola = await _unitOfWork.Role.GetAsync(korisnik.RolaId);
            korisnik.Rola = rola;
            if (id != korisnik.KorisnikId)
            {
                return BadRequest();
            }

            _unitOfWork.Korisnici.Update(korisnik);

            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KorisnikExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetKorisnik", new { id = korisnik.KorisnikId }, korisnik);
        }

        // POST: api/Korisniks
        [HttpPost]
        public async Task<ActionResult<Korisnik>> PostKorisnik(Korisnik korisnik)
        {
            //var stariKorisnik = await _unitOfWork.Korisnici.logovanje(korisnik);
            if (KorisnikExists(korisnik.KorisnikId))
            {
                return BadRequest();
            }
            else
            {
                if ((DateTime.Now - korisnik.DatumRodjenja).TotalDays < 6570)
                    return BadRequest();

                //if (korisnik.Mail == stariKorisnik.Mail || korisnik.KorisnickoIme == stariKorisnik.KorisnickoIme)
                //    return BadRequest();

                _unitOfWork.Korisnici.Add(korisnik);
                await _unitOfWork.SaveChangesAsync();

                return CreatedAtAction("GetProizvod", new { id = korisnik.KorisnikId }, korisnik);
            }
        }
        // POST: api/Korisniks/login
        [HttpPost("{login}")]
        public async Task<IActionResult> Login(Korisnik korisnik)
        {
            var ulogovanKorisnik = await _unitOfWork.Korisnici.logovanje(korisnik);
            if (ulogovanKorisnik != null)
            {
                var rola = await _unitOfWork.Role.GetAsync(ulogovanKorisnik.RolaId);
                ulogovanKorisnik.Rola = rola;
            }
            else
                return BadRequest();
           
            if (ulogovanKorisnik != null)
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new List<Claim>
                    {
                        new Claim("UserID", ulogovanKorisnik.KorisnikId.ToString())
                    }),
                    Expires = DateTime.Now.AddMinutes(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1234567890123456")), SecurityAlgorithms.HmacSha256)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                return Ok(new { token, ulogovanKorisnik });

            }
            else
                return BadRequest( new { message = "Koriscnicko ime ili lozinka su pogresni !"});
        }



        // DELETE: api/Korisniks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Korisnik>> DeleteKorisnik(int id)
        {
            var korisnik = await _unitOfWork.Korisnici.GetAsync(id);
            if (korisnik == null)
            {
                return NotFound();
            }

            _unitOfWork.Korisnici.Remove(korisnik);
            await _unitOfWork.SaveChangesAsync();

            return korisnik;
        }

        private bool KorisnikExists(int id)
        {
            bool isNull = true;
            var korisnik = _unitOfWork.Korisnici.Get(id);
            if (korisnik != null)
                isNull = false;

            return isNull ? false : true;
        }

    }
}
