using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Cma.OnOn.Models
{ 
    public class IssueRepository : IIssueRepository
    {
        CmaOnOnContext context = new CmaOnOnContext();

        public IQueryable<Issue> All
        {
            get { return context.Issues; }
        }

        public IQueryable<Issue> AllIncluding(params Expression<Func<Issue, object>>[] includeProperties)
        {
            IQueryable<Issue> query = context.Issues;
            foreach (var includeProperty in includeProperties) {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public Issue Find(int id)
        {
            return context.Issues.Find(id);
        }

        public void InsertOrUpdate(Issue issue)
        {
            if (issue.Id == default(int)) {
                // New entity
                context.Issues.Add(issue);
            } else {
                // Existing entity
                context.Entry(issue).State = EntityState.Modified;
            }
        }

        public void Delete(int id)
        {
            var issue = context.Issues.Find(id);
            context.Issues.Remove(issue);
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public void Dispose() 
        {
            context.Dispose();
        }
    }

    public interface IIssueRepository : IDisposable
    {
        IQueryable<Issue> All { get; }
        IQueryable<Issue> AllIncluding(params Expression<Func<Issue, object>>[] includeProperties);
        Issue Find(int id);
        void InsertOrUpdate(Issue issue);
        void Delete(int id);
        void Save();
    }
}