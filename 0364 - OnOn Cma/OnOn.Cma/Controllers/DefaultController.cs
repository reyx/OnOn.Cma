﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Cma.OnOn.Controllers
{
    public class DefaultController : Controller
    {
        //
        // GET: /Default/

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult LongProcess()
        {
            Thread.Sleep(5000);
            return Json(true, JsonRequestBehavior.AllowGet);
        }

    }
}