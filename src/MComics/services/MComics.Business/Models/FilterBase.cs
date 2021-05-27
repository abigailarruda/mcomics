using MComics.Core.InterfacesGenerics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MComics.Business.Models
{
    public class FilterBase : IFilterAggregate
    {
        public int Pagina { get; set; }
        public string Nome { get; set; }
        public int Id { get; set; }
        public int Limite { get; set; }
        public FilterBase(){}
        public FilterBase(int pagina, string nome, int id, int limite)
        {
            Pagina = pagina;
            Nome = nome;
            Id = id;
            Limite = limite;
        }
    }
}
