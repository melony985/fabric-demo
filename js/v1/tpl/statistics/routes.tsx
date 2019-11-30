import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import { LayoutBase } from './page/layoutBase';

export const routes = (
    <Router>
        <Switch>
            <Route path='/' component={LayoutBase} />
        </Switch>
    </Router>
);
