using MComics.Business.Adapter.Interfaces;
using MComics.Business.Models;
using MComics.Business.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MComics.Business.Adapter
{
    public class PersonagemAdapter : IPersonagemAdapter
    {
        public Personagem CreateEntity(ResultPersonagem responseModel)
        {
            return new Personagem(responseModel.name, responseModel.description, responseModel.thumbnail.path);
        }
    }
}
