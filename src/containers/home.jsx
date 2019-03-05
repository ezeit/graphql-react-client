import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Item from '../components/item'
import Search from '../components/search'

const Home = (props) => (
    <Router>
        <div>                    
            <div>               
            <Route exact path="/" render={(props) => <Search {...props} />} />
                <Route path="/item/:id" render={(props) => <Item {...props} />} />
            </div>
        </div>
    </Router>
 );

 export default Home