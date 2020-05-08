import React, { Component } from 'react';
import axios from 'axios';

/** Responsible for rendering the map displaying probability of getting abducted
 * */
class MapDetail extends Component {
    constructor() {
        super();
        this.state = {
            latitude: 51.18291,
            longitude: -0.63098,
            radius: 50000
        }
    }

    componentDidMount() {
        this.getCityData();
    }

    getCityData = () => {
        console.log(this.state);
        axios.get('https://cors-anywhere.herokuapp.com/http://ufo-api.herokuapp.com/api/sightings/location/near?lat=51.18291&lon=-0.63098&radius=5000')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err)
            });
    }


    render() {
        return (
            <div className="column">
                <p> whole map goes here </p>
            </div>
        );
    }
}

export default MapDetail;
