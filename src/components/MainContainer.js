
import React from 'react'; 
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Dashboard from './Dashboard'

class MainContainer extends React.Component {


    render() {
        return (
            <Router>
                <Switch>

                      <Route exact path="/dashboard" component={Dashboard}/>

                </Switch>

            </Router>
        )

    }
}


export default MainContainer;