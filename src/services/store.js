import { createStore, combineReducers } from 'redux';
import imageReducer from './reducers/image-reducer';

const rootReducer = combineReducers({
  image: imageReducer,
});

const store = createStore(rootReducer);

export default store;
