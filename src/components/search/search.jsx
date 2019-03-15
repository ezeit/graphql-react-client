import React, { Component } from 'react';
import { createApolloFetch } from 'apollo-fetch';
import ListItems from '../../containers/item/listItems'
import Pagination from '../../containers/pagination/pagination';

import './search.css'


const SearchTypes = Object.freeze({
    RANDOM:   Symbol("random"),
    SUBMIT:  Symbol("submit"),
    NORMAL: Symbol("normal"),
    NEXT: Symbol("next"),
    PREV: Symbol("prev"),
});

class Search extends Component {

    constructor(props) {
        super(props)

        const { query, order, page } = { ...this.props.match.params }        
        this.state = {
            value: query || "",
            currentPage: parseInt(page) || -1,
            order: order || 'ASC',
            searchResult: null
        }
    }

    componentWillMount() {        
        if (!this.state.value) {
            const busquedasIniciales = [
                'Casa',
                'Auto',
                'Teclado',
                'Parlante',
                'Televisor'
            ];

            var busqueda = busquedasIniciales[Math.floor(Math.random() * busquedasIniciales.length)];
            this.handleSearch(SearchTypes.RANDOM, busqueda);
        } else {
            this.handleSearch(SearchTypes.NORMAL);
        }
    }

    search = (query, page, order) => {
        const fetch = createApolloFetch({
            uri: "http://localhost:3500/graphql",
        });

        return fetch({
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
            variables: { query: query, page: page, order: order },
        });
    }

    handleSearch = (type, query, order) => {
        let searchInPage = 1;
        let resultPage = 1;        
        switch (type) {
            case SearchTypes.RANDOM:
                resultPage = -1;
                break;
            case SearchTypes.SUBMIT:
                order = order || 'ASC'
                break;
            case SearchTypes.NORMAL:
                searchInPage = resultPage = this.state.currentPage || 1
                break;
            case SearchTypes.NEXT:
                searchInPage = resultPage = this.state.currentPage + 1
                break;
            case SearchTypes.PREV:
                searchInPage = resultPage = this.state.currentPage - 1
                break;
            default:
                break;
        }

        this.search(query || this.state.value, searchInPage, order || this.state.order)
            .then(res => {                
                this.setState({
                    searchResult: res.data.search.items,
                    hasNextPage: res.data.search.pageInfo.hasNextPage,
                    currentPage: resultPage,
                    order: order || this.state.order
                })
            })
    }

    handleASCClick = (event) => {
        event.preventDefault();
        this.props.history.push(`/search/${this.state.value}/1/ASC`)
        this.handleSearch(SearchTypes.SUBMIT)
    }

    handleDESCClick = (event) => {
        event.preventDefault();
        this.props.history.push(`/search/${this.state.value}/1/DESC`)
        this.handleSearch(SearchTypes.SUBMIT,null,'DESC')
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.history.push(`/search/${this.state.value}/1/ASC`)
        this.handleSearch(SearchTypes.SUBMIT)
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value })
    }

    handlePreviousPageClick = (event) => {
        event.preventDefault();        
        this.props.history.push(`/search/${this.state.value}/${this.state.currentPage -1}/${this.state.order}`)
        this.handleSearch(SearchTypes.PREV)        
    }

    handleNextPageClick = (event) => {
        event.preventDefault();        
        this.props.history.push(`/search/${this.state.value}/${this.state.currentPage +1}/${this.state.order}`)
        this.handleSearch(SearchTypes.NEXT)        
    }

    render() {        
        return (
            <div className="search">
                <form className="search-form" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Ingresá lo que quieras buscar" value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="" ></input>
                </form>
                <ListItems items={this.state.searchResult} order={this.state.order} currentPage={this.state.currentPage} handleASCClick={this.handleASCClick} handleDESCClick={this.handleDESCClick} />
                <Pagination query={this.state.value} order={this.state.order} currentPage={this.state.currentPage} nextPage={this.state.hasNextPage} handlePreviousPageClick={this.handlePreviousPageClick} handleNextPageClick={this.handleNextPageClick} />
            </div>
        );
    }

}

export default Search;
