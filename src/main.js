import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'materialize-css';
import 'materialize-css/sass/materialize.scss';

createApp(App).use(router).mount('#app')
