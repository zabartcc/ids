import {createStore} from 'vuex';
import timer from './timer.js';
import user from './user.js';
import components from './components.js';

export default createStore({
	modules: {
		user,
		timer,
		components
	}
});
