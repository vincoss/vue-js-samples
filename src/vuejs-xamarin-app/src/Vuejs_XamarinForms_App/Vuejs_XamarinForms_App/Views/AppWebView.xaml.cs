using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vuejs_XamarinForms_App.Services;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Vuejs_XamarinForms_App.Views
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
            var htmlSource = new HtmlWebViewSource();

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

            htmlSource.BaseUrl = DependencyService.Get<IBaseUrl>().Get();
            webViewHtmlString.Source = htmlSource;
        }
    }
}