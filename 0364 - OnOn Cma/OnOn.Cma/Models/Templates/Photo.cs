using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cma.OnOn.Models.Templates
{
    public class Photo
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Title { get; set; }

        [MaxLength(155)]
        public string Subtitle { get; set; }

        [Required]
        public string Image { get; set; }

        [Required]
        public string Thumbnail { get; set; }

        //[ForeignKey("Id")]
        //public virtual Album Album { get; set; }

        //[ForeignKey("Id")]
        //public virtual Carrossel Carrossel { get; set; }
    }
}