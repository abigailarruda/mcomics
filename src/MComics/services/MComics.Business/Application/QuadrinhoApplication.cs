﻿using MComics.Business.Application.Interfaces;
using MComics.Business.Models;
using MComics.Business.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MComics.Business.Application
{
    public class QuadrinhoApplication : IQuadrinhoApplication
    {
        private readonly IQuadrinhoService _quadrinhoService;

        public QuadrinhoApplication(IQuadrinhoService quadrinhoService)
        {
            _quadrinhoService = quadrinhoService;
        }

        public Task<Quadrinho> BuscarEntidade(FilterBase parameter)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Quadrinho>> BuscarLista(FilterBase parameter)
        {
            return await _quadrinhoService.BuscarLista(parameter);
        }

        public void Dispose()
        {
             _quadrinhoService.Dispose();
        }
    }
}