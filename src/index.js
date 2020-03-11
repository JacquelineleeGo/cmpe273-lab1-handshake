import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import configStore from "./common/redux/configStore";
const store = configStore();

 ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
