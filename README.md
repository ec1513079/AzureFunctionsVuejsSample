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

## 要件
### クライアント
* node >= 8.x
* nmp >= 5.x
* webpack >= 2.x
### API
* azure-functions-core-tools >= 1.0.12
    * [Azure Functions Core Tools](https://docs.microsoft.com/ja-jp/azure/azure-functions/functions-run-local)

## フォルダ構成
### クライアント
```
AzureFunctionsVuejsSample.Web
    ├─build
    │  ├# webpackビルドの実行スクリプトとconfigをまとめておいておくためのフォルダ
    │  └# webpackビルドで変更がある以外はいじらなくてOK
    ├─client
    │  ├─assets
    │  │  ├# Faviconやpng画像、単体で動くjs(webpackでコンパイルしないjs)等を置いておくフォルダ
    │  │  ├# webpackでビルドすると、このフォルダが直接distフォルダに置かれるので、
    │  │  └# Webサーバ配置時に公開したい資産はこのフォルダに集めておくこと。
    │  ├─components
    │  │  ├# 独自に作ったVueのコンポーネントを置くフォルダ
    │  │  ├# 複数の画面で共有されるVueテンプレートや、各画面から共通部品として使うVueテンプレートは
    │  │  └# コンポーネントとしてこのフォルダに置くこと
    │  ├─filters
    │  │  ├# 独自に作ったVueのフィルターを置くフォルダ
    │  │  ├# Vueのフィルターについては https://jp.vuejs.org/v2/guide/filters.html を参照すること
    │  │  ├# 簡単に言うと"{{ message | capitalize }}"みたいにパイプでつなげて値を変換していける機能
    │  │  └# 独自に作れるメソッドチェーンと考えればOK
    │  ├─plugins
    │  │  ├# 独自に作ったVueのプラグインを置くフォルダ
    │  │  ├# Vueのプラグインについては https://jp.vuejs.org/v2/guide/plugins.html を参照すること
    │  │  └# 簡単に言うと"this.$プラグイン名"のようにグローバルスコープで参照できるユーティリティを追加できる機能
    │  ├─router
    │  │  ├# vue-routerの設定をまとめておくフォルダ
    │  │  ├# vue-routerについては https://router.vuejs.org/ja/essentials/getting-started.html を参照
    │  │  └# 独自のルーティングを追加する以外はいじらなくてOK
    │  ├─store
    │  │  ├─modules
    │  │  │  ├─menu
    │  │  │  │ └# サイドバーのメニュー用のモジュール
    │  │  │  └# 独自に作ったVuexのモジュールをまとめておくフォルダ
    │  │  ├─actions.js
    │  │  │  └# アクションのみのVuexをまとめて登録するファイル
    │  │  ├─getters.js
    │  │  │  └# ゲッターのみのVuexをまとめて登録するファイル
    │  │  ├─index.js
    │  │  │  ├# Vuexのルートファイル
    │  │  │  └# modulesフォルダに独自のVuexモジュールを作ったらここで登録するのを忘れずに
    │  │  ├# Vuexの各種設定やモジュールをまとめておくフォルダ
    │  │  ├# Vuexについては https://vuex.vuejs.org/ja/intro.html を参照
    │  │  ├# Vuexについて簡単説明することは難しいので、
    │  │  └# とりあえず https://vuex.vuejs.org/ja/getting-started.html の最初の最初のセクションを読んでください
    │  └─views
    │     ├─Xxx
    │     │  ├─modules
    │     │  │  └─XxxYyy.vue
    │     │  │     └# Xxx/index.vueを分割したVueテンプレート
    │     │  └─index.vue
    │     │     ├# Xxx画面の基本レイアウトVueテンプレート
    │     │     ├# レイアウトが大きくなりすぎる場合は、同階層にmoduelsフォルダを作り分割を行う
    │     │     ├# modulesフォルダに置くのはあくまでindex.vueを分割したモジュールであることに注意
    │     │     └# 他の画面からも利用する場合は、comportsフォルダに移動すること
    │     ├# アプリケーションの各画面を置くフォルダ
    │     ├# 新しい画面を作る際はフォルダを切り、その中に作っていくこと
    │     └# 画面ルートのファイル名は"inxex.js"にする
    ├─config
    │  ├─index.js
    │  │  └# 全環境共用の環境設定
    │  ├─dev.env.js
    │  │  └# 開発環境の環境設定
    │  ├─prod.env.js
    │  │  └# 本番環境の環境設定
    │  └─test.env.js
    │     └# ユニットテスト実施時のの環境設定
    └─dist
       └# "npm run build"で作成されるパッケージフォルダ
```

**注意 componentsフォルダとviewsフォルダの使い分けについて**

viewフォルダにはフォルダが切られ、実際にブラウザで表示される画面の単一ファイルコンポーネントのみがindex.vueという名前でフォルダ内に置かれます。  
componentsフォルダには、各画面から参照される共通部品の単一ファイルコンポーネントが置かれます。  
(つまりcomponentsフォルダの.vueファイルが直接画面として表示されることはない)
ただし例外として、画面のindex.vueが巨大になりすぎるときに、index.vueと同階層にmodulesフォルダを切り、index.vueをモジュール分割することが許されます。

例)
- 画面としてはHoge画面のみが表示される
- Hoge画面はFugaモジュール、Fooモジュール、Barモジュールで構成される
- Fooモジュール、Barモジュールは他の画面からも利用できる
```
client
  ├─components
  │  ├─Foo
  │  │  └─index.vue
  │  └─Bar.vue
  └─views
     └─Hoge
        ├─modules
        │  └─Fuga.vue
        └─index.vue
```

※ Vue.jsの単一ファイルコンポーネントについては [こちら](https://jp.vuejs.org/v2/guide/single-file-components.html) を参照
