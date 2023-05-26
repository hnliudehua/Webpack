# webpackTs
webpck打包ts文件配置



//-D表示开发依赖包 webpack包 webpack-cli webpack命令行包 typescript ts包 ts-loader webpack处理ts文件加载器包 有了这个webpack才能对ts进行打包处理
npm i -D webpack webpack-cli typescript ts-loader 




//webpack打包命令
//在package.json文件中script属性中设置build属性为webpack即可使用 npm run build命令来打包文件(直接执行webpack) "build":"webpack"





//可以在被打包的(出口)文件夹自动生成html文件的插件 引入后不需要自己再去生成html文件了  并且它会将css js等等已经被webpack打包编译好的文件自动引入到生成的html文件中
html-webpack-pligin




//webpack内置服务器，和webpack关联 可以检测项目文件的变化并自动更新
webpack-dev-server 




//在package.json文件中script属性中设置start属性为webpack server --open即可使用 npm start(--open 用浏览器打开) js文件更新时会实时更新
"start": "webpack server --open chrome.exe"





//可以先删除dist编译后的文件，再把最新的文件放进dist（打包后的）文件夹内，防止代码文件更新后还有旧文件的遗留
clean-webpack-plugin




//webpack默认是不知道哪些文件是可以被引用的（例如新建了一个ts文件 export向外暴露了一个变量a 我在另一个ts文件内import导入变量a 会报错 ）
//解决方案就可以在webpack配置文件中设置resolve属性来告诉webpack哪些文件是可以被用来当引用文件的




//解浏览器兼容问题 比如ie浏览器就不支持es6以后的语法  像Promise这些webpack直接转换是转换不过来的 这个时候就要用到插件来解决
//这些是与 Babel 相关的 npm 包，用于在 JavaScript 项目中进行代码转换和兼容性处理
//@babel/core "@babel/core" 是 Babel 的核心包，它提供了 Babel 的核心功能和 API。它是使用 Babel 进行代码转换的基础。
//@bable/preset-env "@babel/preset-env" 是 Babel 的预设之一，它根据目标环境的配置自动确定要应用的转换和插件（比如ie浏览器，Google浏览器，火狐游览器，他们的环境是不一样的）。通过使用 "@babel/preset-env"，你可以根据需要配置目标环境的浏览器或 Node.js 版本，Babel 将根据这些配置自动进行相应的代码转换和兼容性处理。
//@babel-loader "@babel/loader" 是 Babel 的加载器，用于在 webpack 构建过程中将 JavaScript 文件传递给 Babel 进行处理。它允许你在 webpack 配置中配置 Babel 的转换规则和插件，以便在构建过程中对代码进行转换。
//core-js "core-js" 是一个 JavaScript 库，提供了对 ES6+ 新特性的兼容性支持。通过引入 "core-js" 库，你可以在不支持某些 ES6+ 特性的旧版本浏览器中使用这些特性。在 Babel 配置中使用 "@babel/preset-env" 预设时，它可以自动根据目标环境的配置引入 "core-js" 并进行必要的 polyfill。
//命令
//npm i -D @babel/core @bable/preset-env babel-loader core-js