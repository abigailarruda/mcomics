using MComics.Business.Adapter;
using MComics.Business.Adapter.Interfaces;
using MComics.Business.Application;
using MComics.Business.Application.Interfaces;
using MComics.Business.Services;
using MComics.Business.Services.Interfaces;
using MComics.Core.Integration;
using MComics.Core.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MComics.API.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void RegisterDependenciesServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IIntegrationKey>(new IntegrationKey(configuration.GetKeysConnection("public"),
                configuration.GetKeysConnection("private")));

            services.AddSingleton<IIntegrationModel>(x => x.GetRequiredService<IOptions<IntegrationModel>>().Value);

            services.AddScoped<IQuadrinhoApplication, QuadrinhoApplication>();
            services.AddScoped<IPersonagemApplication, PersonagemApplication>();
            services.AddScoped<IEventoApplication, EventoApplication>();

            services.AddHttpClient<IQuadrinhoService, QuadrinhoService>
                (b => b.BaseAddress = new Uri(configuration["IntegrationConfig:RequestUrl"]));
            services.AddHttpClient<IPersonagemService, PersonagemService>
                (b => b.BaseAddress = new Uri(configuration["IntegrationConfig:RequestUrl"]));
            services.AddHttpClient<IEventoService, EventoService>
                (b => b.BaseAddress = new Uri(configuration["IntegrationConfig:RequestUrl"]));

            services.AddScoped<IQuadrinhoAdapter, QuadrinhoAdapter>();
            services.AddScoped<IPersonagemAdapter, PersonagemAdapter>();
            services.AddScoped<IEventoAdapter, EventoAdapter>();

        }
    }
}
