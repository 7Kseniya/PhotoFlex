import { createStore } from 'redux';
import imageReducer from './reducers/image-reducer';

const store = createStore(imageReducer);

export default store;
