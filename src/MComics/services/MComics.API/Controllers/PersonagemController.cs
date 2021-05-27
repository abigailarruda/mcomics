
using MComics.Business.Application.Interfaces;
using MComics.Business.Models;
using MComics.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MComics.API.Controllers
{
    [Route("api/personagens")]
    public class PersonagemController : MainController
    {
        private readonly IPersonagemApplication _personagemApplication;
        public PersonagemController(IPersonagemApplication personagemApplication)
        {
            _personagemApplication = personagemApplication;
        }

        [HttpGet("BuscarListaPersonagens")]
        public async Task<IActionResult> BuscarListaQuadrinhos(string nome = "")
        {
            var filtro = new FilterBase(1, nome, 0, 0);
            var result = await _personagemApplication.BuscarLista(filtro);

            if (result == null)
            {
                AdicionaErroBase();
                return CustomResponse();
            }

            return CustomResponse(result);
        }
    }
}
