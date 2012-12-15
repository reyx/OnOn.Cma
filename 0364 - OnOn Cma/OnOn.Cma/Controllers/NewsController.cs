using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Cma.OnOn.Models;

namespace Cma.OnOn.Controllers
{
    public class NewsController : Controller
    {
        private readonly INewsRepository newsRepository;

        // If you are using Dependency Injection, you can delete the following constructor
        public NewsController()
            : this(new NewsRepository())
        {
        }

        public NewsController(INewsRepository newsRepository)
        {
            this.newsRepository = newsRepository;
        }

        //
        // GET: /News/

        public ViewResult Index()
        {
            return View();
        }

        //
        // GET: /News/

        public ViewResult List()
        {
            return View(newsRepository.All);
        }

        //
        // POST: /News/Edit/5

        [HttpPost]
        public JsonResult Edit(News news)
        {
            if (ModelState.IsValid)
            {
                newsRepository.InsertOrUpdate(news);
                newsRepository.Save();

                return Json(new { result = true, item = news }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var result = new { result = false, errors = ModelState.Values.SelectMany(t => t.Errors.Select(t1 => t1.ErrorMessage)) };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        //
        // POST: /News/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            newsRepository.Delete(id);
            newsRepository.Save();

            return Json(new { result = true }, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                newsRepository.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}