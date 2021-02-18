using IdentityModel;
using IdentityServer4;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using IdentityServer4.Test;


namespace VueIdentity.Configuration
{
    public class TestUsers
    {
        public static List<TestUser> Users
        {
            get
            {
                var address = new
                {
                    street_address = "One Hacker Way",
                    locality = "Heidelberg",
                    postal_code = 69118,
                    country = "Germany"
                };

                return new List<TestUser>
                {
                    new TestUser
                    {
                        SubjectId = "1234567890",
                        Username = "Ferdinand",
                        Password = "Pass@word1",
                        Claims =
                        {
                            new Claim(JwtClaimTypes.Name, "Ferdinand Lukasak"),
                            new Claim(JwtClaimTypes.GivenName, "Ferdinand"),
                            new Claim(JwtClaimTypes.FamilyName, "Lukasak"),
                            new Claim(JwtClaimTypes.Email, "fl@email.com"),
                            new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                            new Claim(JwtClaimTypes.WebSite, "http://ferdinand.com"),
                            new Claim(JwtClaimTypes.Address, JsonSerializer.Serialize(address), IdentityServerConstants.ClaimValueTypes.Json)
                        }
                    }
                };
            }
        }
    }
}
