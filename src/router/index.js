import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
		path:'/',
		redirect: '/admin/welcome',
	},{
		path:'/login',
		component: resolve => require(['@/pages/login.vue'], resolve)
	},{
		path: '/admin',
		redirect: '/admin/welcome',
		meta: {
			auth: true //设置登录认证
		},
		component: resolve => require(['@/pages/home.vue'], resolve),
		children: [{
			//欢迎页面
			path: 'welcome',
			component: resolve => require(['@/pages/welcome.vue'], resolve)
		},{
			path:'manager',
			component: resolve=> require(['@/pages/manager/index.vue'], resolve),
			children:[{
				//管理员列表管理
				path:'list',
				component: resolve=> require(['@/pages/manager/list.vue'], resolve)
			}]
		}, { //无权限
			path: 'noperm',
			component: resolve => require(['@/pages/error/noperm.vue'], resolve)
		}, { //无路由
			path: '*',
			component: resolve => require(['@/pages/error/nofind.vue'], resolve)
		}]
	}, {
		path: '*',
		component: resolve => require(['@/pages/error/nofind.vue'], resolve)
	}]
})