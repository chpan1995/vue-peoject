import Svgicon from './Svgicon/index.vue'
import Pagination from './pagination/index.vue'
import Category from './Category/index.vue'

import type { App, Component } from 'vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components: { [name: string]: Component } = { Svgicon, Pagination,Category };

export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        })
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    },
}
