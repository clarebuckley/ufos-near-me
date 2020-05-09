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
            isLoading: true,
            latlng: { lat: 52.570048, lng: -1.899332 },
            sightings: []
        }
    }

    handleLocationChange = (latlng) => {
        this.setState({
            latlng: latlng
        }, () => {
            this.refs.cityDetail.getCityData(latlng);
        })

    }

    updateSightings = (sightings) => {
        this.setState({
            sightings: sightings
        })
    }

    render() {
        return (
            <div className="row">
                <MapDetail sightings={this.state.sightings} handleLocationChange={this.handleLocationChange} />
                <CityDetail updateSightings={this.updateSightings} ref="cityDetail" latlng={this.state.latlng} />
            </div>
        );
    }
}

export default Map;
