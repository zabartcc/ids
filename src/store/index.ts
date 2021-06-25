import { createStore } from 'vuex';
import timer from './timer';
import user from './user';
import components from './components';

export default createStore({
	modules: {
		user,
		timer,
		components
	}
});
