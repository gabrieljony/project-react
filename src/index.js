import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AutorBox from './Autor';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/autor" component={AutorBox}/>
            <Route path="/livro" />
        </Switch>
    </BrowserRouter>
    ),
    document.getElementById('root')
);


serviceWorker.unregister();
