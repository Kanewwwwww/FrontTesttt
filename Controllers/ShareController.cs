using NCDRCropPPT.Services;
using System.Web.Mvc;

namespace NCDRCropPPT.Controllers
{
    public class ShareController : Controller
    {
        // GET: Share
        public ActionResult Index()
        {
            return View();
        }
        
        public FileStreamResult EmbedPdf()
        {
            var service = new PPTPublishService();
            var fileStream = service.GetPublishingPdf();
            return File(fileStream, "application/pdf");
        }
    }
}