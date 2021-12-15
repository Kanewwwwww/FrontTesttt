using System.Web.Mvc;
using NCDRCropPPT.CrossCutting.Helpers;
using NCDRCropPPT.DataModels.Auth;
using NCDRCropPPT.Services;

namespace NCDRCropPPT.Controllers {
    public class AuthController : JsonNetController {
        // GET: Auth
        public ActionResult Index() {
            return View();
        }

        public ActionResult Login( Auth auth ) {
            var ncdrWeb = ConfigHelper.GetAppSetting( "NcdrWeb" );
            if ( auth.GroupId != null && auth.Account != null ) {
                var service = new AuthSerivce();

                User user = new User() { Account = auth.Account, GroupId = auth.GroupId };
                if ( !service.GetCropUpdateAuth( user.GroupId ) ) {
                    return Redirect( ncdrWeb );
                }

                SessionHelper.Write( SessionHelper.Name.User, user );
                return RedirectToAction( "Index", "Home" );
            }
            else {
                return Redirect( ncdrWeb );
            }
        }

        public ActionResult Logout()
        {
            var CorsDomains = ConfigHelper.GetAppSetting("CorsDomain").Split(',');
            var isAuth = false;
            foreach (var item in CorsDomains)
            {
                if (Request.UrlReferrer.Authority == item)
                {
                    isAuth = true;
                }
            }
            if (isAuth == true)
            {
                var cors = Request.UrlReferrer.Scheme + "://" + Request.UrlReferrer.Authority;
                HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", cors);
                var user = (User)SessionHelper.Read(SessionHelper.Name.User);
                SessionHelper.Clear(SessionHelper.Name.User);
            }

            return Json(isAuth, JsonRequestBehavior.AllowGet);
        }

        public void RefreshSession()
        {
        }
    }
}