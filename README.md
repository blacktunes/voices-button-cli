# 语音按钮命令行工具 [Voices-button-cli]
 
本教程使用 Caddy 作为 Web 服务端，和 Screen 用于维持后台进程 

**本教程需要您准备好域名，并将域名解析到服务器，以及具备基本 Linux 知识和错误排查能力**
 

## 1. 配置环境

RHEL/CentOS7:
```
curl --silent --location https://rpm.nodesource.com/setup_16.x | sudo bash -
yum install nodejs -y
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo rpm --import https://dl.yarnpkg.com/rpm/pubkey.gpg
sudo yum install yarn -y
yarn --version
yarn global add n 
n stable
yum install -y screen
yum install yum-plugin-copr
yum copr enable @caddy/caddy
yum install caddy -y
```

**Fedora 或 RHEL/CentOS 8 需要替换最后三条指令**
```
dnf install 'dnf-command(copr)'
dnf copr enable @caddy/caddy
dnf install caddy
```

Ubuntu/Debian: 
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn -y
yarn --version
yarn global add n 
n stable
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy -y
``` 
 
## 2. 安装 

```
cd ~
mkdir vuebutton
cd vuebutton
yarn add voices-button-cli
cd node_modules/.bin
node button create xxx    #xxx替换成你自己要设置的名字
然后按照指示进行
cd xxx   #xxx为你刚刚设置的名字
yarn
yarn build
yarn global add serve
screen -S yarnserver
cd ~/vuebutton/node_modules/.bin/xxx   #xxx为你之前设置的名字
serve -s dist -l 8081
**然后先按 Ctrl+A 再按 D**
screen -S caddyserver
caddy reverse-proxy --from your.domain --to localhost:8081  #将your.domain更改为你解析到服务器上的域名
```

现在，打开 https://your.domain 即可看到语言按钮正常运行  
**记得将your.domain更改为你解析到服务器上的域名**

## 3. 额外注意事项
新版 Caddy 的自动 HTTPS 有时会在初次启动时不生效，因此可能需要在执行完上面最后一条命令后，按 Ctrl+C 再执行一遍，才能让 Caddy 自动配置 HTTPS

### 项目模板

- [Hiiro 按钮](https://github.com/blacktunes/hiiro-button)
- [狼按钮](https://github.com/vbup-osc/mio-button)
