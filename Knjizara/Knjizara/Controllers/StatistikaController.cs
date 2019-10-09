using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Knjizara.Common.Interfaces;
using Knjizara.Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Knjizara.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatistikaController : ControllerBase
    {
        public IUnitOfWork _unitOfWork { get; }

        public StatistikaController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public List<int> getSvihGodina()
        {
            return _unitOfWork.Racuni.getSvihGodinaRacuna();
        }

        // GET: /api/Statistika/2019
        [HttpGet("{godina}")]
        public async Task<IEnumerable<Object>> getZaradeZaGodinu(int godina)
        {
            return await _unitOfWork.Racuni.zaradaNaGodisnjemNivou(godina);
        }

        // GET: /api/Statistika/zarada/2019
        [HttpGet("zarada/{godina}")]
        public Object ukupnaZaradaZaGodinu(int godina)
        {
            return _unitOfWork.Racuni.ukupnaZaradaZaGodinu(godina);
        }

        // GET: /api/Statistika/pazar/
        [HttpGet("pazar")]
        public async Task<IEnumerable<Object>> zaradaNaDnevnomNivou(DateTime dan)
        {
            dan = DateTime.Now;
            return await _unitOfWork.Racuni.zaradaNaDnevnomNivou(dan);
        }

        // GET: /api/Statistika/racuni
        [HttpGet("racuni")]
        public async Task<IEnumerable<Racun>> dnevniRacuni(DateTime dan)
        {
            dan = DateTime.Now;
            return await _unitOfWork.Racuni.dnevniRacuni(dan);
        }

        // GET: /api/Statistika/racuniSata
        [HttpGet("racuniSata")]
        public async Task<IEnumerable<Object>> ukupnaZaradaPoSatu(DateTime dan)
        {
            dan = DateTime.Now;
            return await _unitOfWork.Racuni.racuniPoSatu(dan);
        }
    }
}