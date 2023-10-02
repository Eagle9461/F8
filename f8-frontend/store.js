import { createStore } from 'redux';
import rootReducer from './redux/store';

const store = createStore(rootReducer);

export default store;
