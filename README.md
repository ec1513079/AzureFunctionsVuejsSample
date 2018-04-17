# AzureFunctionsVuejsSample
Azure Functions (API) と Vue.js (クライアント) のサンプルコード

Vue.jsは [vue-admin](https://github.com/vue-bulma/vue-admin) をベースにさせて貰っています。

## 動かしてみる
### クライアント 
```
cd AzureFunctionsVuejsSample.Web
npm install
npm run dev
```
※ もしnpm installで```EPERM: operation not permitted, rename```が発生する場合、下記を試してみる
> npm ERR! code EPERM
> npm ERR! errno -4048
> npm ERR! syscall rename
> npm ERR! Error: EPERM: operation not permitted, rename
```
rm -r .\node_modules
npm cache verify
npm cache clean -f
npm install
```
それでもダメなら管理者権限でプロンプトを立ち上げてnpm installを行う

### サーバ
```
```

## 構成
### クライアント
* node >=
* nmp >=
* webpack >=
### サーバ
* Visual Stadio 2017
* [Azure Functions ツール](https://docs.microsoft.com/ja-jp/azure/azure-functions/functions-develop-vs#check-your-tools-version)

