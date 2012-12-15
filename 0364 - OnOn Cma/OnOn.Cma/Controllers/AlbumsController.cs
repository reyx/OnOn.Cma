using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Cma.OnOn.Models.Templates;
using Cma.OnOn.Models;

namespace Cma.OnOn.Controllers
{   
    public class AlbumsController : Controller
    {
        private CmaOnOnContext context = new CmaOnOnContext();

        //
        // GET: /Albums/

        public ViewResult Index()
        {
            return View(context.Albums.Include(album => album.Photos).ToList());
        }

        //
        // GET: /Albums/Details/5

        public ViewResult Details(int id)
        {
            Album album = context.Albums.Single(x => x.Id == id);
            return View(album);
        }

        //
        // GET: /Albums/Create

        public ActionResult Create()
        {
            return View();
        } 

        //
        // POST: /Albums/Create

        [HttpPost]
        public ActionResult Create(Album album)
        {
            if (ModelState.IsValid)
            {
                context.Albums.Add(album);
                context.SaveChanges();
                return RedirectToAction("Index");  
            }

            return View(album);
        }
        
        //
        // GET: /Albums/Edit/5
 
        public ActionResult Edit(int id)
        {
            Album album = context.Albums.Single(x => x.Id == id);
            return View(album);
        }

        //
        // POST: /Albums/Edit/5

        [HttpPost]
        public ActionResult Edit(Album album)
        {
            if (ModelState.IsValid)
            {
                context.Entry(album).State = EntityState.Modified;
                context.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(album);
        }

        //
        // GET: /Albums/Delete/5
 
        public ActionResult Delete(int id)
        {
            Album album = context.Albums.Single(x => x.Id == id);
            return View(album);
        }

        //
        // POST: /Albums/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Album album = context.Albums.Single(x => x.Id == id);
            context.Albums.Remove(album);
            context.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) {
                context.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}