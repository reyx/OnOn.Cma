using Cma.OnOn.Models.Templates;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Cma.OnOn.Models
{
    public class Page
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int Row { get; set; }
        [Required]
        public int Column { get; set; }
        [Required]
        public int Width { get; set; }
        [Required]
        public int Height { get; set; }

        [Required, MaxLength(155)]
        public string Title { get; set; }

        public string Subtitle { get; set; }
        public string Content { get; set; }

        [MaxLength(155)]
        public string Image { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Type Type { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Nullable<Template> Template { get; set; }

        public Nullable<int> SectionId { get; set; }
        public Nullable<int> AlbumId { get; set; }
        public Nullable<int> CarrosselId { get; set; }
        public Nullable<int> DimerId { get; set; }
        public Nullable<int> EditorialId { get; set; }
        public Nullable<int> VideoId { get; set; }
        public Nullable<int> GaleriaId { get; set; }

        [ForeignKey("SectionId")]
        public virtual Section Section { get; set; }

        [ForeignKey("AlbumId")]
        public virtual Album Album { get; set; }

        [ForeignKey("CarrosselId")]
        public virtual Carrossel Carrossel { get; set; }

        [ForeignKey("DimerId")]
        public virtual Dimer Dimer { get; set; }

        [ForeignKey("EditorialId")]
        public virtual Editorial Editorial { get; set; }

        [ForeignKey("VideoId")]
        public virtual Video Video { get; set; }

        [ForeignKey("GaleriaId")]
        public virtual Galeria Galeria { get; set; }
    }

    public enum Type
    {
        Horizontal,
        Horizontal2,
        Vertical,
        Vertical2,
        Vertical3,
        MiddleText,
        MiddleImage
    }

    public enum Template
    {
        Album,
        Carrossel,
        Dimer,
        Editorial,
        Video,
        Galeria
    }
}