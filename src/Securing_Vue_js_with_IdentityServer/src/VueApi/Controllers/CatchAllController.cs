using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace VueApi.Controllers
{
    public class CatchAllController : Controller
    {
        private readonly IWebHostEnvironment _env;

        public CatchAllController(IWebHostEnvironment env)
        {
            _env = env ?? throw new ArgumentNullException(nameof(env));
        }

        public IActionResult Index()
        {
            // return File("~/index.html", "text/html");

            //var file = _env.ContentRootFileProvider.GetFileInfo("wwwroot/index.html");
            //return PhysicalFile(file.PhysicalPath, "text/html");

            var path = @"C:\_Data\GitHub\xsamples\vue-js-samples\src\Securing_Vue_js_with_IdentityServer\src\VueApi\wwwroot";
            var file = "index.html";
            var fullPath = Path.Combine(path, file);
            return PhysicalFile(fullPath, "text/html");
        }
    }
}
