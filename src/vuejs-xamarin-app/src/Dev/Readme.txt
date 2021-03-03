
## Setup environmnet (installs) admin

# install Chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# install npm and yarn
choco install yarn

## create vue client

# install Vue Cli
yarn global add @vue/cli

# crate Vue app
vue create -n vue-app

# install axios
yarn add axios

# configure
vue ui


## Network erros
On app if there is an network error then check cors header.

## Tools
Chrome Vue.js devtools
Firefox Vue.js devtools

VS Code
VS Code Vetur Extension
VS Code Vue VS Code Extension Pack

## Resources
https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/webview?tabs=windows#invoking-javascript
https://docs.microsoft.com/en-us/xamarin/xamarin-forms/app-fundamentals/custom-renderer/hybridwebview