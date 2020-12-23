import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Master from '../views/layout/Master.vue';

const routes = [
	{
		path: '/', component: Master, children: [
			{
				path: '/',
				name: 'Home',
				component: () => import('../views/page/Home.vue')
			},
			{
				path: '/home',
				name: 'Login',
				component: () => import('../views/page/Home.vue')
			}
		]
	}
]

const router = createRouter({
	history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
	routes
});

export default router;
