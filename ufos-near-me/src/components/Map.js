import React, { Component } from 'react';
import MapDetail from './MapDetail';
import CityDetail from './CityDetail';
import './Map.css';

/** Responsible for rendering the main map content
 * */
class Map extends Component {
    render() {
        return (
            <div className="row">
                <MapDetail  />
                <CityDetail />
            </div>
        );
    }
}

export default Map;
