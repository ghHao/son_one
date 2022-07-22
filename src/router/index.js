import {createRouter, createWebHashHistory} from 'vue-router';
import autoRouter from 'vue-router-auto';

//使用vue-router-auto根据目录自动生成Router,
const routes = autoRouter({
    // 页面级的.vue存放位置，必传
    rc: require.context('@/views', true, /\.vue$/),
    // '/'的重定向，可选，默认为''
    redirect: 'home',
    // 页面级的.vue存放的文件夹，可选，默认为:views
    rootFile: 'views',
});
export {routes};

//设置名字，有些路径没有路径
//在往路由上设置meta属性的时候对于子路由需要parent name.
setName(routes);

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
console.log('router', router.getRoutes());
export default router;

export function setName (routes) {
    for (const route of routes) {
        if (!route.name) {
            route.name = route.path;
        }
        if (route.children) {
            setName(route.children);
        }
    }
}
