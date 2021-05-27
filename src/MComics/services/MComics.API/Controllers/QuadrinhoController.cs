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
    [Route("api/quadrinho")]
    public class QuadrinhoController : MainController
    {
        private readonly IQuadrinhoApplication _quadrinhoApplication;

        public QuadrinhoController(IQuadrinhoApplication quadrinhoApplication)
        {
            _quadrinhoApplication = quadrinhoApplication;
        }

        [HttpGet("BuscarListaQuadrinhos{nome}")]
        public async Task<IActionResult> BuscarListaQuadrinhos(string nome)
        {
            var filtro = new FilterBase(1,nome,0,0);
            var result = await _quadrinhoApplication.BuscarLista(filtro);

            if (result == null)
            {
                AdicionaErroBase();
                return CustomResponse();
            }

            return CustomResponse(result);
        }
    }
}
