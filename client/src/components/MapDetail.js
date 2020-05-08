import React, { Component } from 'react';

/** Responsible for rendering the map displaying probability of getting abducted
 * */
class MapDetail extends Component {
    constructor() {
        super();
        this.state = {
            latitude: 51.18291,
            longitude: -0.63098,
            radius: 5000
        }
    }

    componentDidMount() {
        this.getCityData();
    }

    getCityData = () => {
        console.log(this.state);
        fetch('http://ufo-api.herokuapp.com/api/sightings/location/near?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&radius= ' + this.state.radius, {
            mode: 'no-cors' // 'cors' by default
        })
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
