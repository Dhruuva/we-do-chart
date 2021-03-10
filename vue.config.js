module.exports = {
	
	parallel: false,
	publicPath: process.env.NODE_ENV === "production" ? "/we-chart" : "/pub-wechart",
	"devServer": {
		"port": 8282
	},
	css: {
        requireModuleExtension: true,
        extract: true
    },

	chainWebpack: config => {
		//const lintFixAuto = config.module.rule('eslint');

		const sRule = config.module.rule('stylus');
		//console.log("--------------->",lintFixAuto.uses);
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
	],

 //    chainWebpack: config => {
	//     config.module.rule('eslint').use('eslint-loader').options({
	//       fix: true
	//     })
	// }
}
