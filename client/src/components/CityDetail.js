import React, { Component } from 'react';
import './CityDetail.css';
import axios from 'axios';

/** Responsible for rendering the abduction information for each city once clicked on the map
 * */
class CityDetail extends Component {
    constructor() {
        super();
        this.urlPrefix = 'https://cors-anywhere.herokuapp.com/http://ufo-api.herokuapp.com/api';

        //lat/long/city should come from map data
        this.state = {
            isLoading: true,
            latitude: 51.18291,
            longitude: -0.63098,
            radius: 50000,
            sightings: [],
            city: "[[the city I clicked on]]"
        }
    }

    componentDidMount() {
        this.getCityData();
    }

    getCityData = () => {
        axios.get(this.urlPrefix + '/sightings/location/near?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&radius=' + this.state.radius)
            .then((res) => {
                console.log(res.data.sightings[0]);
                this.setState({
                    isLoading: false,
                    sightings: res.data.sightings
                })
            })
            .catch((err) => {
                console.error(err)
            });
    }


    render() {
        if (this.state.isLoading) {
            return "Loading...";
        } else {
            return (
                <div className="column">
                    <div className="cityAbductionsContainer">
                        <div className="cityAbductionsHeader">
                            Sightings in {this.state.city}
                        </div>
                        <div className="cityAbductionsContent">
                            {this.state.sightings.map((sighting, index) => (
                                <div className="cityAbductionSighting"> {sighting.obj.city} </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default CityDetail;
