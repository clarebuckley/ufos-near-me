import React, { Component } from 'react';
import axios from 'axios';

/** Responsible for rendering the abduction information for each city once clicked on the map
 * */
class CityDetail extends Component {
    constructor() {
        super();
        this.urlPrefix = 'https://cors-anywhere.herokuapp.com/http://ufo-api.herokuapp.com/api';
        this.state = {
            latitude: 51.18291,
            longitude: -0.63098,
            radius: 5000,
            sightings: []
        }
    }

    componentDidMount() {
        this.getCityData();
    }

    getCityData = () => {
        axios.get(this.urlPrefix + '/sightings/location/near?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&radius=' + this.state.radius)
            .then((res) => {
                console.log(res.data.sightings[0]);
            })
            .catch((err) => {
                console.error(err)
            });
    }


    render() {
        return (
            <div className="column">
                <p> abduction here </p>
            </div>
        );
    }
}

export default CityDetail;
