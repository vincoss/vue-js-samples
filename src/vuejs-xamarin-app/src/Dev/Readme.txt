
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
