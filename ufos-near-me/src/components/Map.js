import React, { Component } from 'react';
import MapDetail from './MapDetail';
import CityDetail from './CityDetail';

/** Responsible for rendering the main map content
 * */
class Map extends Component {
    render() {
        return (
            <div>
                <MapDetail />
                <CityDetail />
            </div>
        );
    }
}

export default Map;
