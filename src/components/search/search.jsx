import React, { Component } from 'react';
import { createApolloFetch } from 'apollo-fetch';
//import './App.css';
import ListItems from '../../containers/item/listItems'
import Pagination from '../../containers/pagination/pagination';

import './search.css'

class Search extends Component {

    constructor(props) {
        super(props)


        const { query, order, page } = { ...this.props.match.params }
        console.log("PROPS", query, order, page)

        this.state = {
            value: query || "",
            searchResult: null,
            searchItems: [],
            currentPage: parseInt(page) || -1,
            nextPage: null,
            previousPage: null,
            order: order || 'ASC'
        }
    }

    componentWillMount() {
        console.log("SEARCH Component_WillMount")        

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
                currentPage: -1
            })
        } else {
            this.search(this.state.value, this.state.currentPage, this.state.order);
           this.setState({
               currentPage: this.state.currentPage || 1
           })
        }
    }

    handleSubmit = (event) => {
        //event.preventDefault();
        this.props.history.push(`/search/${this.state.value}/1/ASC`)
        this.search(this.state.value,1, 'ASC')
        
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value })
    }

    handlePreviousPageClick = (event) => {
        //event.preventDefault();
        const { currentPage } = this.state
        console.log("handlePreviousPageClick", currentPage)
        this.search(this.state.value, currentPage - 1, this.state.order)
       this.setState({
           currentPage: currentPage - 1
       })
    }

    handleNextPageClick = (event) => {
        //event.preventDefault();
        const { currentPage } = this.state
        console.log("handleNextPageClick", currentPage)
        this.search(this.state.value, currentPage + 1, this.state.order)
       this.setState({
           currentPage: currentPage + 1
       })
    }

    search = (query, page, order) => {
        const fetch = createApolloFetch({
            uri: "http://localhost:3500/graphql",
        });

         fetch({
            query: `query SearchItems($query: String!, $page: Int, $order: String) {
                        search(query: $query, page:$page, order:$order) {
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
                            hasNextPage
                        }
                        totalCount
                        }
                    }
    `,
            variables: { query: query, page: page, order:order },
        })
        .then(res => {
           this.setState({
               searchResult: res.data.search.items,
               hasNextPage: res.data.search.pageInfo.hasNextPage
           })
        });
    }

    handleASCClick = () => {
        this.props.history.push(`/search/${this.state.value}/1/ASC`)
        this.setState({
            order: 'ASC',
            currentPage: 1            
        })
        this.search(this.state.value,1, 'ASC')
    }

    handleDESCClick = () => {
        this.props.history.push(`/search/${this.state.value}/1/DESC`)
        this.setState({
            order: 'DESC',
            currentPage: 1            
        })
        this.search(this.state.value,1, 'DESC')
    }

    render() {
        console.log("SEARCH Component_Render")
        return (
            <div className="search">
                <form className="search-form" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="" ></input>
                </form>
                <ListItems items={this.state.searchResult} order={this.state.order} currentPage={this.state.currentPage} handleASCClick={this.handleASCClick}  handleDESCClick={this.handleDESCClick} />
                <Pagination query={this.state.value} order={this.state.order} currentPage={this.state.currentPage} nextPage={this.state.hasNextPage} handlePreviousPageClick={this.handlePreviousPageClick} handleNextPageClick={this.handleNextPageClick} />
            </div>
        );
    }

}

export default Search;
