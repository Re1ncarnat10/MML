
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MoviesPage from './MoviesPage'; 

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/movies" component={MoviesPage} />
               
            </Switch>
        </Router>
    );
};

export default Routes;
