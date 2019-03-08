import React, { Component } from 'react';
import { createApolloFetch } from 'apollo-fetch';
//import './App.css';
import ListItems from '../../containers/item/listItems'
import Pagination from '../../containers/pagination/pagination';

import './search.css'

class Search extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: "",
            searchResult: null,
            searchItems: [],
            currentPage: 0,
            nextPage: null,
            previousPage: null,            
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)        
        this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this)
        this.handleNextPageClick = this.handleNextPageClick.bind(this)
        this.search = this.search.bind(this)
    }

    componentDidMount() {
            if (!this.state.value) {
                const busquedasIniciales = [                    
                    'Casa',
                    'Auto',
                    'Teclado',
                    'Parlante',
                    'Televisor'
                ];

                var busqueda = busquedasIniciales[Math.floor(Math.random() * busquedasIniciales.length)];                
                this.search(busqueda);
                this.setState({
                    currentPage: 0
                })
            }
    }

    handleSubmit(event) {
        event.preventDefault();
       this.search(this.state.value);
       this.setState({
          currentPage: 1,          
       })
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handlePreviousPageClick(event) {
        event.preventDefault();
        const { currentPage } = this.state
        this.search(this.state.value, this.state.previousPage)
        this.setState({
            currentPage: currentPage - 1
        })
    }

    handleNextPageClick(event) {
        event.preventDefault();
        const { currentPage } = this.state
        console.log("NEXT",this.state.value, this.state.nextPage)
        this.search(this.state.value, undefined, this.state.nextPage)
        this.setState({ currentPage: currentPage + 1 })
    }

    search(query, before, after) {
        const fetch = createApolloFetch({
            uri: "http://localhost:3500/graphql",
        });

        fetch({
            query: `query SearchItems($query: String!, $first: Int!, $after: String, $before: String) {
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
            variables: { query: query, first: 5, after: after, before: before },
        }).then(res => {
            console.log("DATA",res)
            this.setState({
                previousPage: res.data.search.pageInfo.endCursor,
                searchResult: res.data.search.items,                
                nextPage: res.data.search.pageInfo.hasNextPage ? res.data.search.pageInfo.endCursor : null
            })
        });
    }

    render() {
        return (
            <div className="search">

                <form className="search-form" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="" ></input>                    
                </form>                
                <ListItems items={this.state.searchResult} handleClick={() => { }} />
                <Pagination currentPage={this.state.currentPage} nextPage={this.state.nextPage} handlePreviousPageClick={this.handlePreviousPageClick} handleNextPageClick={this.handleNextPageClick} />
            </div>
        );
    }

}

export default Search;
