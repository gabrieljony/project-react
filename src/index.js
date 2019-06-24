import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AutorBox from './Autor';
import LivroAdmin from './Livro';
import Home from './Home';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

ReactDOM.render(
    (
    <BrowserRouter>
        <Switch>
            <App>
                <Route exact path="/" component={Home} />
                <Route path="/autor" component={AutorBox}/>
                <Route path="/livro" component={LivroAdmin}/>
            </App>
        </Switch>
    </BrowserRouter>
    ),
    document.getElementById('root')
);


serviceWorker.unregister();
