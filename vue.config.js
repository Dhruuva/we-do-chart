module.exports = {
    publicPath: '/pub-wechart',
    parallel: false,

    "devServer": {
      "port": 8282
    },

    chainWebpack: config => {
		const sRule = config.module.rule('stylus');
		//console.log("--------------->",sRule);
		sRule.uses.clear();
		sRule
			.test(/\.styl(us)?$/)
			.oneOf('vue')
	        	.resourceQuery(/vue/)
				.use('stylus-loader')
					.loader('stylus-loader')
					.options( {stylusOptions: { sourceMap: false,preferPathResolver: 'webpack' }})
					.end()
			.end()		
	},

    transpileDependencies: [
      'vuetify'
    ]
}
