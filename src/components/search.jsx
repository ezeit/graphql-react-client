import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
//import './App.css';
import { createApolloFetch } from 'apollo-fetch';
import Item from './item'

class Search extends Component {

   constructor(props) {
      super(props)

      this.state ={
        sarchResult : null,
        value:"",
        currentPage : 0,
        nextPage : null,
        previousPage: null
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this)
      this.handleNextPageClick = this.handleNextPageClick.bind(this)
      this.search = this.search.bind(this)
  }

  componentDidMount()
  {
      if(!this.state.value){
        const busquedasIniciales = [
          'Chromecast',
          'Casa',
          'Auto',
          'Teclado',
          'Parlante',
          'Televisor'
        ];
      
        var busqueda = busquedasIniciales[Math.floor(Math.random() * busquedasIniciales.length)];

        this.search(busqueda)          
      }
  }

  handlePreviousPageClick(event){
    event.preventDefault();
    const {currentPage} = this.state    
    this.search(this.state.value, this.state.previousPage)
    this.setState({
      currentPage : currentPage -1
    })
  }

  handleNextPageClick(event){
    event.preventDefault();
    const {currentPage} = this.state    
    this.search(this.state.value, undefined, this.state.nextPage)
    this.setState({currentPage : currentPage +1})
  }

  handleSubmit(event){
    event.preventDefault();       
    this.search(this.state.value)  
    this.setState({currentPage : 1})
  }

  search(query, before, after){
    const fetch = createApolloFetch({
      uri: "http://localhost:3500/graphql",
    });
    // console.log("BEFORE",before,"AFTER",after)
    fetch({
      query: `query PostsForAuthor($query: String!, $first: Int!, $after: String, $before: String) {
        search(query: $query, first: $first, after: $after, before: $before) {
          items{
            id
            title    
            price
            currency_id
            thumbnail
            condition
            accepts_mercadopago
            shipping{
              free_shipping
              store_pick_up
            }
          }
          pageInfo{
            endCursor
            hasNextPage
          }
          totalCount
        }
      }
    `,
      variables: { query: query, first: 5, after:after, before:before },
    }).then(res => {                  
      this.setState({
        previousPage :  res.data.search.pageInfo.endCursor,
        sarchResult : res.data.search,
        nextPage : res.data.search.pageInfo.hasNextPage ? res.data.search.pageInfo.endCursor : null
      })      
    });    
  }


  handleChange(event){
    this.setState({value : event.target.value})
  }

  render() {
    return (
      <Router>
      <div>
        <div className="Search">
          <form onSubmit={this.handleSubmit}>        
            <input type="text" value={this.state.value} onChange={this.handleChange} />        
            <input type="submit" value="Buscar" />
          </form>
        </div>
        <div className="Results">
          {this.state.sarchResult && this.state.sarchResult.items.map((item, i) => {                             
            return <p><a href="#" onClick={(e) => this.props.itemClick(item.id, e)} id={item.id}>{item.title}</a></p>
            
          })}
        </div>
        <div className="Pages">
          {(() => {
            if(this.state.currentPage > 1){
              return <a href="#" onClick={this.handlePreviousPageClick}>Anterior</a>
            }
          })()}
          {(() => {
            if(this.state.currentPage > 0){
              return <span>{this.state.currentPage}</span>
            }
          })()}
          {(() => {
            if(this.state.currentPage > 0 && this.state.nextPage){
              return <a href="#" onClick={this.handleNextPageClick}>Siguiente</a>
            }
          })()}
        </div>
        <Route path="/item/:id" render={(props) => <Item {...props} />} />
      </div>
      </Router>
    );
  }
  
}

export default Search;
