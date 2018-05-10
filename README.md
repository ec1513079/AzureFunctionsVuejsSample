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

### API 
```
cd AzureFunctionsVuejsSample.Function
func host start
```

### API (管理者用)
```
cd AzureFunctionsVuejsSample.AdminFunction
func host start
```

## 構成
### クライアント
* node >= 8.x
* nmp >= 5.x
* webpack >= 2.x
### API
* azure-functions-core-tools >= 1.0.12
    * [Azure Functions Core Tools](https://docs.microsoft.com/ja-jp/azure/azure-functions/functions-run-local)

