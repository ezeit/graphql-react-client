import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Item from './item'
import Search from './search'

class Home extends Component {
    constructor(props) {        
        super(props)  

        this.state = {
            redirectItem: null
          }
        
          this.handleItemClick = this.handleItemClick.bind(this)
          
    }

    handleItemClick(id, event){
        event.preventDefault();
        console.log("ITEM_ID",id)
        window.location.href = `/item/${id}`
    }

    render() {
        return (
          <Router>
              <div>
                  <Switch>
                        <Route exact path="/" render={(props) => <Search {...props} itemClick={this.handleItemClick} />} />                                 
                        <Route path="/item/:id" render={(props) => <Item {...props} />} />                                
                  </Switch>                
              </div>
          </Router>
        );
      }
}

export default Home;
