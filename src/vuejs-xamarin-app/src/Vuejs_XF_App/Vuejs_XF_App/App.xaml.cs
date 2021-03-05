using System;
using Vuejs_XF_App.Views;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Vuejs_XF_App
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();

            //  MainPage = new NavigationPage(new MainPage());
            MainPage = new SamplesCustomWebView();
        }

        protected override void OnStart()
        {
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }
    }
}
