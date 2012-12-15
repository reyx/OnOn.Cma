using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Cma.OnOn.Models.Templates
{
    public class Galeria
    {
        [Key, ForeignKey("Page")]
        public int Id { get; set; }

        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string Content { get; set; }

        public virtual ICollection<Album> Albuns { get; set; }
        public virtual ICollection<Video> Videos { get; set; }
        
        public virtual Page Page { get; set; }
    }
}