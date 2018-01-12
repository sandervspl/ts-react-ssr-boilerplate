import { combineReducers, createStore, applyMiddleware, compose, GenericStoreEnhancer } from 'redux';
import thunk from 'redux-thunk';
import { appReducers, ReduxStore } from 'app/ducks';

let middleware = applyMiddleware(thunk);
const reducers = combineReducers<ReduxStore>(appReducers);

const w = window as any;

if (__DEV__ && __CLIENT__ && typeof w.devToolsExtension === 'function') {
    middleware = compose(middleware, w.devToolsExtension()) as GenericStoreEnhancer;
}

export const store = createStore<ReduxStore>(reducers, middleware);
