using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vuejs_XamarinForms_App.Views;
using Xamarin.Forms;

namespace Vuejs_XamarinForms_App
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        private void Button_Clicked(object sender, EventArgs e)
        {
            this.Navigation.PushAsync(new AppWebView());
        }
    }
}
