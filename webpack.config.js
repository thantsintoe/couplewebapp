module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    publicPath: 'dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
	  {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
//          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
	  },
	  {
			test: /\.css$/,
//			use: [
//			  { loader: "style-loader" },
//			  { loader: "css-loader" }
//			]
		  	loaders: ["style", "css"]
	  }
      
    ]
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  },
  resolve: {
    alias: {
//      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};