
# Start
dotnet vueidentity.dll --urls "https://localhost:5443" --WebRoot "C:\_Data\GitHub\Vue.js\Securing_Vue_js_with_IdentityServer\src\VueIdentity\wwwroot"
dotnet VueApi.dll --urls "https://localhost:5000" --WebRoot "C:\_Data\GitHub\xsamples\vue-js-samples\src\Securing_Vue_js_with_IdentityServer\src\VueApi\wwwroot"

# Resources
https://github.com/IdentityModel/oidc-client-js
http://docs.identityserver.io/en/latest/quickstarts/community.html
https://www.richard-banks.org/2018/11/securing-vue-with-identityserver-part2.html
https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da
https://medium.com/better-programming/creating-localstorage-wrapper-with-typescript-7ff6b71b35cb

## Exeptions
System.ArgumentException: The 'ClientId' option must be provided. (Parameter 'ClientId')

	Ensure that Indentity Server AddGoogle has client ID and secret