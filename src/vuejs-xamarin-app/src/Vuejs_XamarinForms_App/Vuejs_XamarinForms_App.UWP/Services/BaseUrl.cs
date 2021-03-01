using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vuejs_XamarinForms_App.Services;
using Vuejs_XamarinForms_App.UWP.Services;

[assembly: Xamarin.Forms.Dependency(typeof(BaseUrl))]
namespace Vuejs_XamarinForms_App.UWP.Services
{
    public class BaseUrl : IBaseUrl
    {
        public string Get()
        {
            return "ms-appx-web:///assets/wwwroot/";
        }
    }
}
