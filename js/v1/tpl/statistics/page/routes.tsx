
import * as React from 'react';
import {
    Redirect,
    Route,
} from 'react-router-dom';
import { Server } from './statistics/server/index';

export const routes = (
    <div>
        <Route
            exact
            path='/'
            render={() => <Redirect to='/statistics/server' />}
        />
        <Route exact path='/statistics/server' component={Server} />
    </div>
);
