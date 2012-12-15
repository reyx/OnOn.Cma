using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cma.OnOn.Models.Templates
{
    public class Dimer
    {
        [Key, ForeignKey("Page")]
        public int Id { get; set; }
        
        [Required, ForeignKey("Id")]
        public virtual Photo AfterImage { get; set; }

        [Required, ForeignKey("Id")]
        public virtual Photo BeforeImage { get; set; }

        [MaxLength(6)]
        public virtual ICollection<Photo> Images { get; set; }

        public virtual Page Page { get; set; }
    }
}