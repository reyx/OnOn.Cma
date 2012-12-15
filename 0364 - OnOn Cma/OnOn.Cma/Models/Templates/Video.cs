using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Cma.OnOn.Models.Templates
{
    public class Video
    {
        [Key, ForeignKey("Page")]
        public int Id { get; set; }

        public string Title { get; set; }
        public string Subtitle { get; set; }

        public int Position { get; set; }

        public string Url { get; set; }

        [ForeignKey("Id")]
        public virtual Galeria Galeria { get; set; }
        
        public virtual Page Page { get; set; }
    }
}