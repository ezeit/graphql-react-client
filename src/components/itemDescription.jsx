import React, { Component } from 'react';


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
            <div className="Description">    
                {this.state.description &&
                    <div>   
                        <h3>{this.state.description}</h3>
                    </div>
                }            
            </div>
        );
    }
}

export default ItemDescription;
