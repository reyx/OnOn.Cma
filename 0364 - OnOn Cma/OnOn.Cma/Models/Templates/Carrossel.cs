using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cma.OnOn.Models.Templates
{
    public class Carrossel
    {
        [Key, ForeignKey("Page")]
        public int Id { get; set; }

        public string Title { get; set; }

        public virtual ICollection<Photo> TopPhotos { get; set; }
        public virtual ICollection<Photo> MiddlePhotos { get; set; }
        public virtual ICollection<Photo> BottomPhotos { get; set; }

        public virtual Page Page { get; set; }
    }
}