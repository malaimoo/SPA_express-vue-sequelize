# SPA_express-vue-mongodb
a SPA project all use javascript lang.



##准备工作
###1. 安装 express,express-cli
###2. 安装 node js
###3. 安装 vue,vue-cli


##1.express-cli
使用 [express 脚手架](http://expressjs.com/en/starter/generator.html)生成一个空的项目，
全局安装：
```
npm install express-generator -g
```
到项目目录下生成
```
express <myapp>
```
生成的目录结构
```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade
```
其中，pubic 为静态文件，看目录也知道是放一些 js，css 什么的。后面我们用 vue build 出来的 js 就放在这个里面。express 会帮我们搞定。到时候就是 www.xxx.com/javascritps/a.js 就可以访问到 a.js 这个文件了。

再看下最重要的入口文件,index 和 app 。

index 文件使用 nodejs 的 http 模块启动一个服务器并监听错误。

app 加载 express 模块。并使用route 对请求进行路由。后面我们就是通过这两个路由分别管理静态页面（vue 打包之后的文件）和 api 接口的请求。

这里渲染我们选择使用 ejs 模板，这样的话生成的  index.html 也不用修改了,在 app js 中改为：

```
app.set('view engine', 'ejs');
```




##2. vue-cli

下面用 vue-cli 生成一个空的 vue 项目。走你。

```
# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm install
```

vue 的项目不用怎么改，就是把打包的路径改为上面副武器的地址。

### 3.到这里，我们把前后端放到一起吧

新建一个文件件 express-vue
然后

```
npm init
```
生成一个 package.json
把 vue 的依赖和 express 的依赖全部放到这一个 package.json 里面。

然后，我们需要配置好 Babel register，所以需要在项目跟路径下新增两个文件 `.babelrc` 和 `index.js`，内容分别为

/.babelrc

```
{
  "presets": ["es2015"],
}

```

.babelrc 是 Babel 6.0 必须的文件

/.index.js

```
require('babel-register')
require('./src/server')
```

上面两句完成 Bebel 注册，它会爬取所有 `require` 或 `import` 方式依赖的模块并把它们翻译成 ES5。

Express 自动生成的代码里有个 www 文件，他是 Express 应用的入口文件，我们把它放在 server 路径下并改名为 index.js 以便让上面配置的 Babel register 能正确找到它。

> 为什么要改名为 index.js ？这是因为 `require('./src/server')` 在默认情况下会去找 ./src/server/index.js，如果你想用别的名字，那就记得将 Babel register 的配置文件里改为 `require(./src/<your entry file>`。

分别移动 vue 到 client ，移动  express 到 server 的文件夹。



### 4.做一些结合工作

现在虽然我们把它们放到一起了，但是还是不能运行的。

####4.1 将vue 直接打包到 server 的静态文件件
首先修改 vue 的 webpack 将打包地址改为 server 的 '/pulic' 文件夹。
index 的输出直接改为后缀 ejs.

修改 vue config

```
...
index: path.resolve(__dirname, '../../server/public/index.ejs'),
    assetsRoot: path.resolve(__dirname, '../../server/public/javascripts'),
    assetsSubDirectory: '',
...
```

####4.2 其次，使用 nodemon 做流程化管理。

之前提到过，计划用 Nodemon 启动 server 并监听代码变动。而 Nodemon 默认会监听除了 .git 和 node_modules 路径外的所有 js 代码，因为我们已经有 Webpack 监听前端代码了，所以得做相关配置让 Nodemon 只监听某一块代码。

在项目根路径下新增文件 nodemon.json，内容为

```
{
  "verbose": true,
  "ignore": ["src/server/public/"],
  "events": {
    "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
  },
  "watch": ["src/server/"],
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "js jade"
}

```

其中，将 verbose 设置为 true 将打印更丰富的日志信息，对开发很有帮助。

我们选择让 Nodemon 监听 src/server/ 目录，并忽略 src/server/public 目录，因为那里是前端 webpack 生成打包文件的地方。注意我们是以 Express 中间件的形式使用 Webpack，并不会在磁盘上真的产生文件，所以这个 ignore 规则其实可以省略。




### 5. 使用 build 完成之后的项目进行测试

1. 在 clint 文件夹里运行 'npm run dev'。这里浏览器应该自动打开页面，否则打开 localhost:8080(如果端口不是8080，在config/index.js 里面查找)
2. 在 server 文件夹里运行 'npm run dev', 启动 express 服务器。

这里确认 server 的app.js 的根路由是如下导向的：

```
var index = require('./routes/index');
app.set('view engine', 'ejs');
app.use('/', index);
```

意思就是/ 根请求就访问 index.ejs。就是我们打包的 vue 工程。
