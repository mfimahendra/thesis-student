const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
	configureWebpack: {
		plugins: [			
		]
	},

	pwa : {
		name : 'Indonesian Students Data',
	}
}
