const CracoLessPlugin = require('craco-less');
const path = require('path')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
    // 在控制台上显示编译进度
    // new webpack.ProgressPlugin(),
  ],
  webpack: {
    configure: (webpackConfig, {
      env, paths
    }) => {
      // paths.appPath='public'
      paths.appBuild = 'dist'
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
        publicPath: './'
      }
      return webpackConfig
    },
    alias: {//设置别名是为了让后续引用的地方减少路径的复杂度
      "@": path.resolve("src"),
    }
  },
  // 出口（必须要有）
	output: {
		// filename: 'bundle.js', // bundle 一束、一捆
		// [chunkhash] 是为了解决“代浏览器缓存”导致用户端代码不更新的问题
		filename: '[name].[chunkhash].js',
		// 只能使用绝对路径
		path: path.resolve(__dirname, './dist'),
		// Webpack（5.20.0+）的写法，用于自动清除 dist 目录
		clean: true
	},
	// loaders
	module: {
		rules: []
	},
  
	devServer: {
		// port: 5000,
		// 开启热更新（HMR = hot module replacement）
		// 热更新，只对main.js往后的依赖才起作用
		// 实际上，开启一台socket服务器，当代码发生变化时，通知客户端socket进行更新
		hot: true,
		open: true,
		// 用于指定静态资源目录（本地服务器）
		contentBase: path.resolve(__dirname, './public'),
    proxy:{
      '/api':{
        target: 'http://localhost:8888',
        changeOrigin: true
      }
    },
	}
};