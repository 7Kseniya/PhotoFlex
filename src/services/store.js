import { createStore, combineReducers, applyMiddleware } from 'redux';
import imageReducer from './reducers/image-reducer';
import authReducer from './reducers/auth-reducer';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  image: imageReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
