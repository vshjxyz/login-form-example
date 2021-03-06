import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    const storeEnhancer = typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f;
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(thunk),
        storeEnhancer
    ));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
};
