using NCDRCropPPT.CrossCutting.Helpers;
using NCDRCropPPT.DataModels.Auth;
using NCDRCropPPT.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NCDRCropPPT.Controllers
{
    public class FileUpdateController : JsonNetController
    {
        // GET: FileUpdate
        public ActionResult Index()
        {
#if DEBUG
            var user = (User)SessionHelper.Read(SessionHelper.Name.User);
#else
            var user = (User)SessionHelper.Read(SessionHelper.Name.User);
#endif

            if (user == null)
            {
                var ncdrWeb = ConfigHelper.GetAppSetting("NcdrWeb");
                return Redirect(ncdrWeb);
            }
            var service = new AuthSerivce();
            if (service.CheckUserAuth(user))
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [UpdateAuthorize]
        public ActionResult GetCropFileList()
        {
            var service = new FileUpdateService();
            var status = "ok";
            var data = default(object);
            var msg = string.Empty;
            try
            {
                data = service.GetCropFileList();
            }
            catch (Exception ex)
            {
                status = "fail";
                msg = ex.Message;
            }

            var result = new { status = status, msg = msg, data = data };
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [UpdateAuthorize]
        public ActionResult FileUpdate(int id)
        {
            var service = new FileUpdateService();
            var status = "ok";
            var data = default(object);
            var msg = string.Empty;
            try
            {
                var user = (User)SessionHelper.Read(SessionHelper.Name.User);
                service.FileUpdate(id, user, Request.Files[0]);
            }
            catch (Exception ex)
            {
                status = "fail";
                msg = ex.Message;
            }

            var result = new { status = status, msg = msg, data = data };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CheckDownloadFile(int id)
        {
            var service = new FileUpdateService();
            //service.DeletePPTs( pptIds );
            var status = "ok";
            var data = default(object);
            var msg = string.Empty;
            try
            {
                data = service.CheckDownloadFile(id);
            }
            catch (Exception ex)
            {
                status = "fail";
                msg = ex.Message;
            }

            var result = new { status = status, msg = msg, data = data };
            return Json(result, JsonRequestBehavior.DenyGet);
        }

        public ActionResult DownloadFile(int Id)
        {
            var service = new FileUpdateService();
            var user = (User)SessionHelper.Read(SessionHelper.Name.User);
            var data = service.DownloadFile(Id, user, out string name);
            return File(data, "application/vnd.openxmlformats-officedocument.presentationml.presentation", name);
        }

    }
}