import Tab from './Tab.vue'
import TabItem from './TabItem.vue'

export default {
	install(app) {
		app.component('Tab', Tab)
		app.component('TabItem', TabItem)
	}
}
