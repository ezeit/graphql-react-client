import React, { Component } from 'react';
import ItemDescription from './itemDescription'

class Item extends Component {
    constructor(props) {
        console.log("1")
        super(props)

        this.state = {
            itemInfo : null
        }
    }

    async componentDidMount(){
        const { match: { params } } = this.props;
        const { id } = params;

        let data = await fetch(`https://api.mercadolibre.com/items/${id}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                return json
            });
        console.log("data",data)
        this.setState({
            itemInfo : data
        })
    }

    render() {    
        return (
            <div className="Item">    
                {this.state.itemInfo &&
                    <div>   
                        <h1>{this.state.itemInfo.title}</h1>        
                        <div>
                        <h2>${this.state.itemInfo.price}</h2>
                        <img src={this.state.itemInfo.pictures[0].url}></img>
                        </div>
                        <ItemDescription id={this.state.itemInfo.id}></ItemDescription>
                    </div>
                }            
            </div>
        );
    }
}

export default Item;
