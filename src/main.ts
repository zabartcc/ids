import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// @ts-ignore
import store from './store';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

createApp(App).use(store).use(router).mount('#app');
