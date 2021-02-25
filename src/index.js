import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './store/reducers';
import watchers from './store/sagas';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-toastify/dist/ReactToastify.css';

import './assets/styles/modalAndSlider.scss';
import './assets/styles/pagination.scss';
import './assets/styles/input.scss';
import './assets/styles/button.scss';
import './assets/styles/toastyfy.scss';
import './assets/styles/descEditor.scss';
import './assets/styles/style.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saga = createSagaMiddleware();
const store = createStore(reducers, composeEnhancers(applyMiddleware(saga)));
saga.run(watchers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
