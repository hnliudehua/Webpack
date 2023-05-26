//webpack配置文件基本结构


//package.json文件中script属性中设置build属性为webpack即可使用 npm run build命令来打包文件(直接执行webpack) "build":"webpack"

//引入一个包 可以拼接路径
const path = require('path')

//引入html插件 可以在被打包的(出口)文件夹自动生成html文件 并且它会将css js等等已经被webpack打包编译好的文件自动引入到生成的html文件中
const HTMLWebpackPlugin = require('html-webpack-plugin')

//会删除dist打包后文件夹内所有的文件  再把新的打包文件放进去
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

//webpack中的所有配置信息都应该写在module.exports中
module.exports = {
    mode:'development',
    //指定入口文件，指定从哪开始执行
    entry:"./src/index.ts",

    //出口 指定打包文件所在的目录
    output: {
        //指定打包文件要放在哪个目录 path.resolve拼接文件路径 __dirname当前文件所在目录 ./dist(拼接文件路径时当前文件夹下新建一个dist文件)
        path:path.resolve(__dirname,'./dist'),
        //打包后文件的名字
        filename:"bundle.js",
        //webpack打包后的文件默认是立即执行的箭头函数 在ie是没有箭头函数的  所有可以根据enviroument中的arrowFunction来设置打包后的文件用不用箭头函数
        environment:{
            arrowFunction:false
        }
    },
    
    //指定webpack打包时要用到的加载器
    module: {
        //有了加载器 webpack才能打包文件 例子(npm i ts-loader就是在下载webpack构建时处理ts文件的加载器，有了它webpack才能对ts文件进行打包处理并编译成js文件)
        //指定loader加载器的规则
        rules:[
            {
                //test指定规则生效的文件 /\.ts$/已ts后缀的文件
                test: /\.ts$/,
                //use指定用哪个加载器去处理test指定的文件 加载器是从后往前执行
                use: [
                    //加载器不用配置就可以直接用字符串写出来比如直接ts-loader，要配置就得用对象
                    //配置babel
                    {
                        //指定加载器
                        loader:"babel-loader",
                        //设置babel
                        options:{
                            //设置预定义环境
                            presets:[
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //设置浏览器要兼容的版本
                                        targets:{
                                            "chrome":"88",
                                            "ie":"11"
                                        },
                                        //指定corejs版本
                                        "corejs":"3",
                                        //使用corejs的方式 "usage" 表示按需加载 可以提高性能 用到哪个就加载哪个
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    }
                    ,
                    'ts-loader'
                ],
                //要排除的文件 use不做处理的文件 只要路径里有/node_modules/就不给编译
                exclude: /node_modules/
            }
        ]
    },
    
    //配置webpack插件
    plugins:[
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            //title:'这是一个自定义的title', //可以更改html的标题
            template:'./src/index.html' //可以自定义html模板 根据(项目文件夹)路径的html文件在打包后的文件夹中生成一个相应的html文件
        }),
    ],
    
    //用来设置引用模块 告诉webpack这些文件可以被引入
    resolve:{
        //ts和js可以被引入
        extensions:['.ts','.js']
    }
}