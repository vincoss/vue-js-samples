using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Vuejs_XF_App.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SamplesCustomWebView : ContentPage
    {
        public SamplesCustomWebView()
        {
            InitializeComponent();

            hybridWebView.RegisterAction(data => DisplayAlert("Alert", "Hello " + data, "OK"));
        }
    }
}