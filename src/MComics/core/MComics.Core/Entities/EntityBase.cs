using System;
using System.Collections.Generic;
using System.Text;

namespace MComics.Core.Entities
{
    public abstract class EntityBase
    {
        public Guid Id { get; set; }
        public override string ToString()
        {
            return $"{GetType().Name } [Id = {Id}]";
        }
    }
}
