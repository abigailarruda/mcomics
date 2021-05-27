using MComics.Core.InterfacesGenerics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MComics.Business.Models
{
    public class Personagem : IAggregateRoot
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Imagem { get; set; }
        public Personagem(string nome, string descricao, string imagem)
        {
            Nome = nome;
            Descricao = descricao;
            Imagem = imagem;
        }
    }
}
