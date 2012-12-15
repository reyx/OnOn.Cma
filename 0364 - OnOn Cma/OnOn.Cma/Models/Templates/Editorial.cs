using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Cma.OnOn.Models.Templates
{
    public class Editorial
    {
        [Key, ForeignKey("Page")]
        public int Id { get; set; }

        public virtual ICollection<Photo> Photos { get; set; }
        
        public virtual Page Page { get; set; }
    }
}