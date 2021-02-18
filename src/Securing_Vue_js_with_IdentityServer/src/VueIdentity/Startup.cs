using IdentityServer4;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VueIdentity.Configuration;

namespace VueIdentity
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            var builder = services.AddIdentityServer(
                 options => {
                     options.Events.RaiseErrorEvents = true;
                     options.Events.RaiseInformationEvents = true;
                     options.Events.RaiseFailureEvents = true;
                     options.Events.RaiseSuccessEvents = true;
                     options.IssuerUri = "http://localhost:5443";
                 })
                .AddDeveloperSigningCredential()
                .AddInMemoryIdentityResources(Config.IdentityResources)
                .AddInMemoryApiScopes(Config.ApiScopes)
                .AddInMemoryClients(Config.Clients)
                .AddInMemoryApiResources(Config.GetApis())
                .AddTestUsers(TestUsers.Users);

            services.AddAuthentication();
                //.AddGoogle("Google", options =>
                //{
                //    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;

                //    options.ClientId = "";
                //    options.ClientSecret = "";
                //})
                //.AddOpenIdConnect("oidc", "Demo Vue.js IdentityServer", options =>
                //{
                //    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                //    options.SignOutScheme = IdentityServerConstants.SignoutScheme;
                //    options.SaveTokens = true;

                //    options.Authority = "https://demo.identityserver.io/";
                //    options.ClientId = "interactive.confidential";
                //    options.ClientSecret = "secret";
                //    options.ResponseType = "code";

                //    options.TokenValidationParameters = new TokenValidationParameters
                //    {
                //        NameClaimType = "name",
                //        RoleClaimType = "role"
                //    };
                //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            
            app.UseIdentityServer();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
        }
    }
}
