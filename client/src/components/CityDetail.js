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
            latitude: 52.587580,
            longitude: -1.8724808,
            radius: 10000,
            sightings: [],
            city: "[[the city I clicked on]]",
            selectedAbduction: 0
        }
    }

    componentDidMount() {
        this.getCityData();
    }

    getCityData = () => {
        axios.get(this.urlPrefix + '/sightings/location/near?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&radius=' + this.state.radius)
            .then((res) => {
                console.log(res.data.sightings[2].obj);
                this.setState({
                    isLoading: false,
                    sightings: res.data.sightings
                })
            })
            .catch((err) => {
                console.error(err)
            });
    }

    handleAbductionSelected = (index) => {
        this.setState({
            selectedAbduction: index
        })
    }


    render() {
        if (this.state.isLoading) {
            return "Loading...";
        } else {
            return (
                <div className="column CityDetail">
                    <p>Click any result to see more</p>
                    <div className="cityAbductionsContainer">
                        <div className="cityAbductionsHeader">
                            Sightings in {this.state.city}
                        </div>
                        <div className="cityAbductionsContent">
                            {this.state.sightings.map((sighting, index) => (
                                <div key={index} className="cityAbductionSighting" onClick={() => { this.handleAbductionSelected(index) }} >
                                    <p>{sighting.obj.date.split("T")[0]}: {sighting.obj.city.split(" ")[0]}</p>
                                    <p>{sighting.obj.shape}: {sighting.obj.summary.substring(0, 25)}...</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="focusedAbductionContainer">
                        <div className="cityAbductionsHeader">
                            {this.state.sightings[this.state.selectedAbduction].obj.date.split("T")[0]}: {this.state.sightings[this.state.selectedAbduction].obj.city}
                        </div>
                        <div className="focusedAbductionContent">
                            <p>Selected: {this.state.selectedAbduction}</p>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default CityDetail;
