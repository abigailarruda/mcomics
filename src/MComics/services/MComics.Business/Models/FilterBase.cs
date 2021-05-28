﻿using MComics.Core.InterfacesGenerics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MComics.Business.Models
{
    public class FilterBase : IFilterAggregate
    {
        public string Nome { get; set; }
        public int Id { get; set; }
        public FilterBase(string nome, int id)
        {
            Nome = nome;
            Id = id;
        }
    }
}
