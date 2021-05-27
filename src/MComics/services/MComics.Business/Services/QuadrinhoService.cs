using MComics.Business.Adapter.Interfaces;
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
    public class QuadrinhoService : IQuadrinhoService
    {
        private readonly IIntegrationModel _integrationModel;
        private readonly HttpClient _httpClient;
        private readonly IQuadrinhoAdapter _quadrinhoAdapter;
        private readonly IIntegrationKey _integrationKey;
        private readonly string currentDate = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss");
        public QuadrinhoService(IIntegrationModel integrationModel, HttpClient httpClient, IQuadrinhoAdapter quadrinhoAdapter,
            IIntegrationKey integrationKey)
        {
            _integrationModel = integrationModel;
            _httpClient = httpClient;
            _quadrinhoAdapter = quadrinhoAdapter;
            _integrationKey = integrationKey;
        }

        public Task<Quadrinho> BuscarEntidade(FilterBase parameter)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Quadrinho>> BuscarLista(FilterBase parameter)
        {
            var requestURL = string.Concat($"{_integrationModel.RequestUrl}/comics?titleStartsWith={parameter.Nome}",
                $"&orderBy=issueNumber&ts={currentDate}&apikey={_integrationKey.PublicKey}",
                $"&hash={IntegrationService.GerarHashCode(currentDate, _integrationKey.PrivateKey, _integrationKey.PublicKey)}");

            var response = await _httpClient.GetFromJsonAsync<RootResponseQuadrinho>
                (requestURL);

            var result = new List<Quadrinho>();
            foreach (var quadrinho in response.data.results)
            {
               result.Add(_quadrinhoAdapter.CreateEntity(quadrinho));
            }

            return result;
        }

        public void Dispose()
        {
            _httpClient?.Dispose();
        }
    }
}
