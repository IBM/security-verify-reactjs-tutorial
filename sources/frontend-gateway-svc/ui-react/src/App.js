import React from 'react';
import HomePage from './HomePage';
import UserDashboard from './UserDashboard';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
    
    render(){
   
        return (
                <div>
                    <Switch>
                        <Route exact path='/'>
                            <HomePage />
                        </Route>
                        <Route path='/dashboard'>
                             <UserDashboard />
                        </Route>
                    </Switch>
                </div>
        )
    }
}
export default App;