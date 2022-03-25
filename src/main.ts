import { createApp } from "vue"
import App from "./App.vue"

import ElementPlus from "element-plus"
// import powerfulTable from "../lib/powerful-table.umd.min.js"
import powerfulTable from 'el-plus-powerful-table-ts'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import "element-plus/theme-chalk/src/index.scss"
import './powerfulTable/index.scss';
import '@/modules/index';

const app = createApp(App)
app.use(ElementPlus)
app.use(powerfulTable)
app.mount("#app")