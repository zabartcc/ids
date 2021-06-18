import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';

interface RoutesType {
	path: string;
	name?: string;
	component: () => unknown;
	meta?: {
		index?: number;
		keepAlive?: boolean;
	};
	children?: RoutesType[];
}

const routes: RoutesType[] = [
	{
		path: '/',
		name: 'Login',
		component: () => import('../views/page/Login.vue')
	},
	{
		path: '/home',
		component: () => import('../views/layout/Master.vue'), 
		children: [
			{
				path: '',
				name: 'Home',
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
