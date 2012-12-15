using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Cma.OnOn.Models
{
    public class News
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(30)]
        public string Title { get; set; }

        [Required]
        public int Position { get; set; }

        [Required]
        public bool Active { get; set; }

        [MaxLength(100)]
        public string Subtitle { get; set; }
        
        public string Content { get; set; }

        [Required]
        public DateTime Published { get; set; }

        [MaxLength(155)]
        public string Image { get; set; }

        [MaxLength(155)]
        public string Thumbnail { get; set; }
    }
}