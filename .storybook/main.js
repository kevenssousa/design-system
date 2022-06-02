module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	framework: '@storybook/vue3',
	core: {
		builder: '@storybook/builder-vite'
	},
	async viteFinal(config) {
		config.plugins = [
			...config.plugins,
			require('@vitejs/plugin-vue-jsx')({
				exclude: [/\.stories\.(t|j)sx?$/, /node_modules/]
			})
		]
		return config
	}
}
