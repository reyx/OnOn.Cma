using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Cma.OnOn.Models
{
    public class Home
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Language { get; set; }

        public virtual ICollection<News> News { get; set; }
        
        public virtual ICollection<Issue> Issues { get; set; }
    }
}