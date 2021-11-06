import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Login';
import App from './App';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Login} />
                <Route path="/cadastrar" component={App}/>
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;

