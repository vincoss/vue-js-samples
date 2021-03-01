using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Webkit;
using Android.Widget;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Vuejs_XF_App.Droid.Services;
using Vuejs_XF_App.Services;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;


[assembly: Xamarin.Forms.Dependency(typeof(BaseUrl_Android))]
namespace Vuejs_XF_App.Droid.Services
{
	public class BaseUrl_Android : IBaseUrl
	{
		public string Get()
		{
			return "file:///android_asset/wwwroot/";
		}
	}
}

