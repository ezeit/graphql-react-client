import React, { Component } from 'react';
import ItemDescription from './itemDescription'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Item extends Component {
    constructor(props) {
        super(props)

        this.state = {
            itemInfo: null
        }
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const { id } = params;

        let data = await fetch(`https://api.mercadolibre.com/items/${id}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                return json
            });
        this.setState({
            itemInfo: data
        })
    }

    render() {
        return (
            <div className="Item">
                {this.state.itemInfo &&
                    <div>
                        <h1>{this.state.itemInfo.title}</h1>
                        <div>
                            <h2>{this.state.itemInfo.currency_id} {this.state.itemInfo.price}</h2>
                            <div>
                                <Carousel dynamicHeight={true} width="600px" showThumbs={false}>
                                    {this.state.itemInfo.pictures && this.state.itemInfo.pictures.map((picture) => {
                                        return <div key={picture.id}>
                                            <img src={picture.url}></img>
                                        </div>
                                    })}
                                </Carousel>
                            </div>

                        </div>
                        <ItemDescription id={this.state.itemInfo.id}></ItemDescription>
                    </div>
                }
            </div>
        );
    }
}

export default Item;
