import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers/root";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import "bootstrap/dist/css/bootstrap.css";

const store = createStore(
          combineReducers,
          undefined,
          composeWithDevTools(
                  applyMiddleware(thunk)
          )
        );
        

ReactDOM.render(
                    <Provider store={store} className="container">
                              <BrowserRouter className="container">
                                        <App className="container"/>
                              </BrowserRouter>
                    </Provider>
          ,
          document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
