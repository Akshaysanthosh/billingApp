import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Assets/Styles/Reset.css"
import "./Assets/Styles/Common.css"
import './index.css';
import './Assets/scss/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from "./Core/Store";
import { Provider } from "react-redux";
const store = configureStore();


ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
     <App/>
     </Provider>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
