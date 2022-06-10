import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Favorites from './pages/Favorites';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/book-details/:id" component={BookDetails} />
                <Route path="/favorites" component={Favorites} />
            </Switch>            
        </BrowserRouter>
    )
}

export default Routes;