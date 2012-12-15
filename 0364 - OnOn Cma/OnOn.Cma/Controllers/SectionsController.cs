using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Cma.OnOn.Models;

namespace Cma.OnOn.Controllers
{   
    public class SectionsController : Controller
    {
		private readonly ISectionRepository sectionRepository;

        public SectionsController() : this(new SectionRepository())
        {
        }

        public SectionsController(ISectionRepository sectionRepository)
        {
			this.sectionRepository = sectionRepository;
        }

        public ViewResult Index()
        {
            return View();
        }

        public JsonResult List(int? id)
        {
            return Json(sectionRepository.All.Where(t => t.IssueId == id).Select(t => new
            {
                t.Color,
                t.Id,
                t.Image,
                t.Issue,
                t.IssueId,
                t.Name,
                Pages = t.Pages.Select(t1 => new
                {
                    t1.AlbumId,
                    t1.CarrosselId,
                    t1.Column,
                    t1.Content,
                    t1.DimerId,
                    t1.EditorialId,
                    t1.GaleriaId,
                    t1.Height,
                    t1.Id,
                    t1.Image,
                    t1.Row,
                    Section = new
                    {
                        t1.Section.Color,
                        t1.Section.Id,
                        t1.Section.Image,
                        t1.Section.Issue,
                        t1.Section.IssueId,
                        t1.Section.Name
                    },
                    t1.SectionId,
                    t1.Subtitle,
                    t1.Title,
                    t1.Type,
                    t1.VideoId,
                    t1.Width
                }),
            }), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Edit(Section section)
        {
            try
            {
                section.Issue = null;
                section.Pages = null;

                if (ModelState.IsValid)
                {
                    sectionRepository.InsertOrUpdate(section);
                    sectionRepository.Save();

                    return Json(new { result = true, item = section }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var result = new { result = false, errors = ModelState.Values.SelectMany(t => t.Errors.Select(t1 => t1.ErrorMessage)) };

                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                var result = new { result = false, errors = new string[] { ex.Message, "" } };
                if (ex.InnerException != null)
                    result.errors[1] = ex.InnerException.Message;

                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            sectionRepository.Delete(id);
            sectionRepository.Save();

            return Json(new { result = true }, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) {
                sectionRepository.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}