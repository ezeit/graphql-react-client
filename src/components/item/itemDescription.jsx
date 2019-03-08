import React, { Component } from 'react';
import './item.css'

class ItemDescription extends Component {
    constructor(props) {        
        super(props)

        this.state = {
            description : null
        }
    }

    async componentDidMount(){
        const { id } = this.props;        

        let data = await fetch(`https://api.mercadolibre.com/items/${id}/descriptions`)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                return json
            });        
        this.setState({
            description : data[0].text || data[0].plain_text
        })
    }

    render() {    
        return (
            <div className="description">    
                {this.state.description &&
                    <div>   
                        <span>{this.state.description}</span>
                    </div>
                }            
            </div>
        );
    }
}

export default ItemDescription;
