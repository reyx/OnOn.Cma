using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace Cma.OnOn.Models
{
    public class CmaOnOnContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, add the following
        // code to the Application_Start method in your Global.asax file.
        // Note: this will destroy and re-create your database with every model change.
        // 
        // System.Data.Entity.Database.SetInitializer(new System.Data.Entity.DropCreateDatabaseIfModelChanges<Cma.OnOn.Models.CmaOnOnContext>());

        public CmaOnOnContext()
            : base("LocalSqlServer")
        {
        }

        public DbSet<Cma.OnOn.Models.Issue> Issues { get; set; }
        public DbSet<Cma.OnOn.Models.Home> Homes { get; set; }
        public DbSet<Cma.OnOn.Models.News> News { get; set; }
        public DbSet<Cma.OnOn.Models.Page> Pages { get; set; }
        public DbSet<Cma.OnOn.Models.Section> Sections { get; set; }

        public DbSet<Cma.OnOn.Models.Templates.Album> Albums { get; set; }
        public DbSet<Cma.OnOn.Models.Templates.Carrossel> Carrossels { get; set; }
        public DbSet<Cma.OnOn.Models.Templates.Dimer> Dimers { get; set; }
        public DbSet<Cma.OnOn.Models.Templates.Editorial> Editorials { get; set; }
        public DbSet<Cma.OnOn.Models.Templates.Galeria> Galerias { get; set; }
        public DbSet<Cma.OnOn.Models.Templates.Photo> Photos { get; set; }
        public DbSet<Cma.OnOn.Models.Templates.Video> Videos { get; set; }
    }
}