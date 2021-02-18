
# Start
dotnet vueidentity.dll --urls "https://localhost:5443" --WebRoot "C:\_Data\GitHub\Vue.js\Securing_Vue_js_with_IdentityServer\src\VueIdentity\wwwroot"
dotnet VueApi.dll --urls "https://localhost:5000" --WebRoot "C:\_Data\GitHub\xsamples\vue-js-samples\src\Securing_Vue_js_with_IdentityServer\src\VueApi\wwwroot"

# Resources
https://www.richard-banks.org/2018/11/securing-vue-with-identityserver-part2.html

## Exeptions
System.ArgumentException: The 'ClientId' option must be provided. (Parameter 'ClientId')

Ensure that Indentity Server AddGoogle has client ID and secret