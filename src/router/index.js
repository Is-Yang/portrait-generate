import Vue from 'vue'
import Router from 'vue-router'

import Home from './home'

Vue.use(Router)
const baseRouter = [{path: '/', redirect:"/index"}];

const router = new Router({
    routes: baseRouter.concat(Home),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return {
                x: 0,
                y: to.meta.savedPosition || 0
            }
        }
    }
})
export default router