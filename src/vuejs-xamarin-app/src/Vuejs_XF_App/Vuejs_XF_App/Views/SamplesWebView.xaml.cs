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
    public partial class SamplesWebView : ContentPage
    {
        public SamplesWebView()
        {
            InitializeComponent();
        }

        private void btnDefaultVueJs_Clicked(object sender, EventArgs e)
        {
            var path = "Vuejs_XF_App.Resources.page0001.html";

            var htmlSource = new HtmlWebViewSource();
            htmlSource.BaseUrl = Path.Combine(DependencyService.Get<IBaseUrl>().Get(), "page0001/");
            htmlSource.Html = SampleExtensions.GetValueEmbeddedResource(typeof(SamplesWebView).Assembly, path);
            webViewHtmlString.Source = htmlSource;
        }

        private void btSample_Clicked(object sender, EventArgs e)
        {
            var path = "Vuejs_XF_App.Resources.page0002.html";

            var htmlSource = new HtmlWebViewSource();
            htmlSource.BaseUrl = Path.Combine(DependencyService.Get<IBaseUrl>().Get(), "page0002/");
            htmlSource.Html = SampleExtensions.GetValueEmbeddedResource(typeof(SamplesWebView).Assembly, path);
            webViewHtmlString.Source = htmlSource;
        }
    }
}