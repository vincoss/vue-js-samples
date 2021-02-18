using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace VueApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SecuredController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<ServiceDto>> Get()
        {
            return new ServiceDto[] {
                new ServiceDto() {
                    Name ="Development"
                },
                new ServiceDto() {
                    Name ="Innovation and Design"
                },
                new ServiceDto() {
                    Name ="Data and Analytics"
                },
                new ServiceDto() {
                    Name ="DevOps"
                },
            };
        }
    }

    public class ServiceDto
    {
        public string Name { get; set; }
    }
}
