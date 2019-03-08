import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from '../header/header'
import Item from '../../components/item/item'
import Search from '../../components/search/search'
import './home.css'

const Home = (props) => (
    <Router>
        <div>
            <header>
                <Header></Header>
            </header>                    
            <div className="main">               
            <Route exact path="/" render={(props) => <Search {...props} />} />
                <Route path="/item/:id" render={(props) => <Item {...props} />} />
            </div>
        </div>
    </Router>
 );

 export default Home