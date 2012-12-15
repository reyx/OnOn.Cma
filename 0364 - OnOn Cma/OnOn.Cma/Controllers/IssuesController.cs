using Cma.OnOn.Models;
using System.Linq;
using System.Web.Mvc;

namespace Cma.OnOn.Controllers
{
    public class IssuesController : Controller
    {
        private readonly IIssueRepository issueRepository;

        // If you are using Dependency Injection, you can delete the following constructor
        public IssuesController()
            : this(new IssueRepository())
        {
        }

        public IssuesController(IIssueRepository issueRepository)
        {
            this.issueRepository = issueRepository;
        }

        public ViewResult Index()
        {
            return View();
        }

        //
        // GET: /List/

        public JsonResult List()
        {
            return Json(issueRepository.All, JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /Issues/Details/5

        public JsonResult Details(int id)
        {
            return Json(issueRepository.Find(id));
        }

        //
        // POST: /Issues/Edit/5

        [HttpPost]
        public JsonResult Edit(Issue issue)
        {
            if (ModelState.IsValid)
            {
                issue.Sections = null;

                issueRepository.InsertOrUpdate(issue);
                issueRepository.Save();

                return Json(new { result = true, item = issue }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var result = new { result = false, errors = ModelState.Values.SelectMany(t => t.Errors.Select(t1 => t1.ErrorMessage)) };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        //
        // POST: /Issues/Delete/5
        [HttpPost, ActionName("Delete")]
        public JsonResult DeleteConfirmed(int id)
        {
            issueRepository.Delete(id);
            issueRepository.Save();
            
            return Json(new { result = true }, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                issueRepository.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}