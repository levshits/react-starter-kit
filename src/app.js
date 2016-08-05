/**
 * Created by LevshitsVV on 05.08.2016.
 */
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import Styles from './styles/main.less';
import App from './scripts/index';

window.ReactDOM = ReactDOM;
window.React = React;
window.App = App;

Styles._insertCss();

