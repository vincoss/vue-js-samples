using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Vuejs_XF_App.Views;
using Xamarin.Forms;

namespace Vuejs_XF_App
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        private void Button_Clicked(object sender, EventArgs e)
        {
            this.Navigation.PushAsync(new SamplesWebView());
        }

        private async void httpGetValuesTest_Clicked(object sender, EventArgs e)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var result = await client.GetAsync("http://localhost:5000/api/values");
                    result.EnsureSuccessStatusCode();
                    var str = await result.Content.ReadAsStringAsync();
                    lblInfo.Text = str;
                }
            }
            catch(Exception ex)
            {
                lblInfo.Text = e.ToString();
            }
        }

        private async void httpsGetValuesTest_Clicked(object sender, EventArgs e)
        {
            try
            {
                var clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, sslPolicyErrors) => { return true; }; 

                using (var client = new HttpClient(clientHandler))
                {
                    var result = await client.GetAsync("https://localhost:5001/api/values");
                    result.EnsureSuccessStatusCode();
                    var str = await result.Content.ReadAsStringAsync();
                    lblInfo.Text = str;
                }
            }
            catch (Exception ex)
            {
                lblInfo.Text = e.ToString();
            }
        }
    }
}
