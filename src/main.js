import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入ant组件库
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Antd);
app.mount('#app');

// 微前端
import microApp from '@micro-zoe/micro-app';
import LifeCycles from "@/utils/microapp/LifeCycles";

microApp.start({
    destroy: true,
    lifeCycles: LifeCycles
});
