using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace VueApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        [HttpPost]
        public void Post([FromBody] ErrorModel error)
        {
            if(error == null || error.Value == null)
            {
                return;
            }
            LogMessage(error.Value);
        }

        private void LogMessage(string str)
        {
            var path = @"C:\temp";
            var fileName = "VueApi-Client-Error-Log.txt";
            var fullPath = System.IO.Path.Combine(path, fileName);
            var message = $"{DateTime.Now:yyyy-MM-dd HH:mm:ss.fffff} {str}";

            using (var tw = new StreamWriter(fullPath, true))
            {
                tw.WriteLine(message);
            }
        }
    }

    public class ErrorModel
    { 
        public string Value { get; set; }
    }   
}
