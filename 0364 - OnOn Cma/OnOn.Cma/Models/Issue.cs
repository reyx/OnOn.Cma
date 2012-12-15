using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace Cma.OnOn.Models
{
    public class Issue
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(30)]
        public string Title { get; set; }

        [MaxLength(100)]
        public string Subtitle { get; set; }

        [MaxLength(7)]
        public string MinVersion { get; set; }

        [Required]
        public DateTime Published { get; set; }

        [MaxLength(155)]
        public string Image { get; set; }

        [MaxLength(155)]
        public string Logo { get; set; }

        [MaxLength(155)]
        public string FeaturedImage { get; set; }

        [MaxLength(155)]
        public string Background { get; set; }

        public virtual ICollection<Section> Sections { get; set; }
    }
}