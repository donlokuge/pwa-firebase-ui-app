
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard'
import Form from './Form'

class MainContainer extends React.Component {


    render() {
        return (

            <Switch>

                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/form" component={Form} />

            </Switch>


        )

    }
}


export default MainContainer;