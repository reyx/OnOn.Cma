using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cma.OnOn.Models.Templates
{
    public class Album
    {
        [Key, ForeignKey("Page")]
        public int Id { get; set; }

        public string Title { get; set; }
        public string Subtitle { get; set; }

        [Required]
        public int Position { get; set; }

        public virtual ICollection<Photo> Photos { get; set; }

        [ForeignKey("Id")]
        public virtual Galeria Galeria { get; set; }
        
        public virtual Page Page { get; set; }
    }
}