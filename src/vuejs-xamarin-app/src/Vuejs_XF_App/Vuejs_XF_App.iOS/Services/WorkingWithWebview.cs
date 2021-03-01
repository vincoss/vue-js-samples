using Foundation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using UIKit;
using Vuejs_XF_App.iOS.Services;
using Vuejs_XF_App.Services;


[assembly: Xamarin.Forms.Dependency(typeof(BaseUrl_iOS))]
namespace Vuejs_XF_App.iOS.Services
{
	public class BaseUrl_iOS : IBaseUrl
	{
		public string Get()
		{
			return $"{NSBundle.MainBundle.BundlePath}/page001/";
		}
	}
}