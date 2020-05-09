import React, { Component } from 'react';
import MapDetail from './MapDetail';
import CityDetail from './CityDetail';
import './Map.css';

/** Responsible for rendering the main map content
 * */
class Map extends Component {
    constructor() {
        super();
        this.state = {
            latlng: { lat: 52.570048, lng: -1.899332 }
        }
    }

    handleLocationChange = (latlng) => {
        this.setState({
            latlng: latlng
        }, () => {
            this.refs.cityDetail.getCityData(latlng);
        })
    }



    render() {
        return (
            <div className="row">
                <MapDetail handleLocationChange={this.handleLocationChange} />
                <CityDetail ref="cityDetail" latlng={this.state.latlng} />
            </div>
        );
    }
}

export default Map;
