﻿using MComics.Business.Adapter.Interfaces;
using MComics.Business.Models;
using MComics.Business.ResponseModels;
using MComics.Business.Services.Interfaces;
using MComics.Core.Integration;
using MComics.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace MComics.Business.Services
{
    public class PersonagemService : IPersonagemService
    {
        private readonly IIntegrationModel _integrationModel;
        private readonly HttpClient _httpClient;
        private readonly IPersonagemAdapter _personagemAdapter;
        private readonly IIntegrationKey _integrationKey;
        private readonly string currentDate = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss");

        public PersonagemService(IIntegrationModel integrationModel, HttpClient httpClient, IPersonagemAdapter personagemAdapter,
            IIntegrationKey integrationKey)
        {
            _integrationModel = integrationModel;
            _httpClient = httpClient;
            _personagemAdapter = personagemAdapter;
            _integrationKey = integrationKey;
        }

        public Task<Personagem> BuscarEntidade(FilterBase parameter)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Personagem>> BuscarLista(FilterBase parameter)
        {
            StringBuilder requestUrl = new StringBuilder();
            requestUrl.Append($"{_integrationModel.RequestUrl}/characters?");

            if(!string.IsNullOrEmpty(parameter.Nome)) requestUrl.Append($"nameStartsWith={parameter.Nome}&");

            requestUrl.Append($"orderBy=modified&ts={currentDate}&apikey={_integrationKey.PublicKey}");
            requestUrl.Append($"&hash={IntegrationService.GerarHashCode(currentDate, _integrationKey.PrivateKey, _integrationKey.PublicKey)}");

            var response = await _httpClient.GetFromJsonAsync<RootResponsePersonagem>
                (requestUrl.ToString());

            var result = new List<Personagem>();
            foreach (var personagem in response.data.results)
            {
                result.Add(_personagemAdapter.CreateEntity(personagem));
            }

            return result;
        }

        public void Dispose()
        {
            _httpClient.Dispose();
        }
    }
}