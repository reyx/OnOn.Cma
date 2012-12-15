using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Cma.OnOn.Models;

namespace Cma.OnOn.Controllers
{
    public class PagesController : Controller
    {
        private readonly IPageRepository pageRepository;

        // If you are using Dependency Injection, you can delete the following constructor
        public PagesController()
            : this(new PageRepository())
        {
        }

        public PagesController(IPageRepository pageRepository)
        {
            this.pageRepository = pageRepository;
        }

        //
        // GET: /Pages/

        public ViewResult Index()
        {
            return View();
        }

        //
        // GET: /List/

        public JsonResult List(int? id)
        {
            return Json(pageRepository.All.Where(t => t.SectionId == id).Select(t => new
            {
                t.Id,
                t.Row,
                t.Column,
                t.Width,
                t.Height,
                t.Title,
                t.Subtitle,
                t.Content,
                t.Image,
                t.Template,
                t.Type,
                t.SectionId,
                t.AlbumId,
                t.CarrosselId,
                t.DimerId,
                t.EditorialId,
                t.VideoId,
                t.GaleriaId
            }), JsonRequestBehavior.AllowGet);
        }

        //
        // POST: /Pages/Edit/5
        [HttpPost]
        public ActionResult Edit(Page page)
        {
            if (ModelState.IsValid)
            {
                page.Section = null;

                pageRepository.InsertOrUpdate(page);
                pageRepository.Save();

                return Json(new { result = true, item = page }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var result = new { result = false, errors = ModelState.Values.SelectMany(t => t.Errors.Select(t1 => t1.ErrorMessage)) };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        //
        // POST: /Pages/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            pageRepository.Delete(id);
            pageRepository.Save();

            return Json(new { result = true }, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                pageRepository.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}