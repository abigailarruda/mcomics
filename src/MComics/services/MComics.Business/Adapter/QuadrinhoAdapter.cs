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
    public class QuadrinhoAdapter : IQuadrinhoAdapter
    {
        public Quadrinho CreateEntity(ResultQuadrinho responseModel)
        {
            return new Quadrinho(responseModel.title,
                responseModel.description,
                responseModel.images.Select(x => x.path).ToList(),
                responseModel.thumbnail.path,
                responseModel.creators.items.Select(x => x.name).ToList(),
                responseModel.issueNumber);
        }
    }
}
