using Cma.OnOn.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Cma.OnOn.Controllers
{
    public class HomeController : Controller
    {
        CmaOnOnContext context = new CmaOnOnContext();

        public ActionResult Index()        
        {
            var news = context.News.OrderByDescending(t => t.Published).Select(t => new
            {
                t.Active,
                t.Content,
                t.Id,
                t.Image,
                t.Position,
                t.Published,
                t.Subtitle,
                t.Thumbnail,
                t.Title
            });

            var issues = context.Issues.Select(t => new
            {
                t.Background,
                t.FeaturedImage,
                t.Id,
                t.Image,
                t.Logo,
                t.MinVersion,
                t.Published,
                t.Subtitle,
                t.Title
            });

            var data = new
            {
                ActiveNews = news.Where(t => t.Active).Take(4),
                InactiveNews = news.Where(t => !t.Active),
                Issues = issues
            };

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            ViewBag.Data = serializer.Serialize(data);

            return View();
        }

        public JsonResult Data()
        {
            var news = context.News.OrderByDescending(t => t.Published).Select(t => new
            {
                t.Active,
                t.Content,
                t.Id,
                t.Image,
                t.Position,
                t.Published,
                t.Subtitle,
                t.Thumbnail,
                t.Title
            });

            var issues = context.Issues.Select(t => new
            {
                t.Background,
                t.FeaturedImage,
                t.Id,
                t.Image,
                t.Logo,
                t.MinVersion,
                t.Published,
                t.Subtitle,
                t.Title
            });

            return Json(new
            {
                ActiveNews = news.Where(t => t.Active).Take(4),
                InactiveNews = news.Where(t => !t.Active),
                Issues = issues
            }, JsonRequestBehavior.AllowGet);
        }
    }
}