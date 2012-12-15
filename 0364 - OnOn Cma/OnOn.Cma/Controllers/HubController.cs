using Cma.OnOn.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cma.OnOn.Controllers
{
    public class HubController : Controller
    {
        // CmaOnOnContext context = new CmaOnOnContext();

        public ViewResult Index()
        {    
            return View();
        }

        public ViewResult Edit()
        {
            return View();
        }
    }
}