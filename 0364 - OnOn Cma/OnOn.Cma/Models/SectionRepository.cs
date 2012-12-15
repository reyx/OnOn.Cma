using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Cma.OnOn.Models
{ 
    public class SectionRepository : ISectionRepository
    {
        CmaOnOnContext context = new CmaOnOnContext();

        public IQueryable<Section> All
        {
            get
            {
                context.Configuration.ProxyCreationEnabled = false;
                return context.Sections;
            }
        }

        public IQueryable<Section> AllIncluding(params Expression<Func<Section, object>>[] includeProperties)
        {
            IQueryable<Section> query = context.Sections;
            foreach (var includeProperty in includeProperties) {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public Section Find(int id)
        {
            return context.Sections.Find(id);
        }

        public void InsertOrUpdate(Section section)
        {
            if (section.Id == default(int)) {
                // New entity
                context.Sections.Add(section);
            } else {
                // Existing entity
                context.Entry(section).State = EntityState.Modified;
            }
        }

        public void Delete(int id)
        {
            var section = context.Sections.Find(id);
            context.Sections.Remove(section);
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public void Dispose()
        {
            context.Configuration.ProxyCreationEnabled = false;
            context.Dispose();
        }
    }

    public interface ISectionRepository : IDisposable
    {
        IQueryable<Section> All { get; }
        IQueryable<Section> AllIncluding(params Expression<Func<Section, object>>[] includeProperties);
        Section Find(int id);
        void InsertOrUpdate(Section section);
        void Delete(int id);
        void Save();
    }
}