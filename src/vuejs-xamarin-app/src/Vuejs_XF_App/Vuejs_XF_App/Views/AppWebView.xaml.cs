using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vuejs_XF_App.Services;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Vuejs_XF_App.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class AppWebView : ContentPage
    {
        public AppWebView()
        {
            InitializeComponent();

            HtmlSource();
        }

        private void HtmlSource()
        {
            var webRootPath = DependencyService.Get<IBaseUrl>().Get();
            var htmlSource = new HtmlWebViewSource();

            htmlSource.BaseUrl = webRootPath;
            htmlSource.Html = @"<html>
                                <head>
                                <link rel=""stylesheet"" href=""site.css"">
                                </head>
                                <body>
                                <h1>Xamarin.Forms</h1>
                                <p>The CSS and image are loaded from local files!</p>
                                <img src='XamarinLogo.png'/>
                                <p><a href=""index.html"">next page</a></p>
                                </body>
                                </html>";


            webViewHtmlString.Source = htmlSource;
            webViewHtmlString.Navigated += WebViewHtmlString_Navigated;
        }

        private void WebViewHtmlString_Navigated(object sender, WebNavigatedEventArgs e)
        {
            lblError.Text = e.Result.ToString();
        }

        private async void bntCalculate_Clicked(object sender, EventArgs e)
        {
            try
            {
                var number = 4;
                string result = await webViewHtmlString.EvaluateJavaScriptAsync($"factorial({number})");
                if(string.IsNullOrWhiteSpace(result))
                {
                    result = "Empty result. Possible error";
                }
                lblError.Text = result;
            }
            catch(Exception ex)
            {
                lblError.Text = ex.ToString();
            }
        }
    }

    public class Constants
    {
        public static string GetAppRootPath()
        {
            return Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
        }

        public static string GetWebRoot()
        {
            return Path.Combine(GetAppRootPath(), "assets", "wwwroot");
        }

        public static string GetWebIndexPage()
        {
            return Path.Combine(GetWebRoot(), "index.htnl");
        }
    }
}