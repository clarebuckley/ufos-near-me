import React, { Component } from 'react';
import './CityDetail.css';
import axios from 'axios';

/** Responsible for rendering the abduction information for each city once clicked on the map
 * */
class CityDetail extends Component {
    constructor() {
        super();
        this.urlPrefix = 'https://cors-anywhere.herokuapp.com/';

        //lat/long/city should come from map data
        this.state = {
            isLoading: true,
            radius: 10000,
            sightings: [],
            city: "[[the city I clicked on]]",
            selectedAbduction: '-',
            selectedFullSummary: "placeholder"
        }
    }

    componentDidMount() {
        this.getCityData();
    }

    getCityData = () => {
        axios.get(this.urlPrefix + 'http://ufo-api.herokuapp.com/api/sightings/location/near?lat=' + this.props.latlng.lat + '&lon=' + this.props.latlng.lng + '&radius=' + this.state.radius)
            .then((res) => {
                this.setState({
                    isLoading: false,
                    sightings: res.data.sightings
                })
            })
            .catch((err) => {
                console.error(err);
            })
    }

    handleAbductionSelected = (index) => {
        if (index === this.state.selectedAbduction) {
            this.setState({
                selectedAbduction: '-'
            })
        } else {
            this.setState({
                isLoading: true
            })
            this.getFullSummary(index).then((fullSummary) => {
                this.setState({
                    isLoading: false,
                    selectedAbduction: index,
                    selectedFullSummary: fullSummary
                })
            })
        }

    }

    //This is entirely dependent on how the ufo page structure their website and will break if they ever do change it
    getFullSummary = (index) => {
        return new Promise((resolve, reject) => {
            fetch(this.urlPrefix + this.state.sightings[index].obj.url)
                .then(response => response.text())
                .then(text => {
                    let summaryBlock = text.split("<TR VALIGN=TOP>")[2];
                    summaryBlock = this.stripHtml(summaryBlock).trim();
                    return resolve(summaryBlock);
                })
        })

    }

    stripHtml = (html) => {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }


    render() {
        if (this.state.isLoading) {
            return "Loading...";
        } else {
            return (
                <div className="column CityDetail">
                    <div className="cityAbductionsContainer">
                        <div className="cityAbductionsHeader">
                            Sightings in {this.state.city}
                        </div>
                        <div className="cityAbductionsContent">
                            {this.state.sightings.map((sighting, index) => (
                                <div key={index} className={this.state.selectedAbduction === index ? 'selectedCityAbductionSighting' : 'cityAbductionSighting'} onClick={() => { this.handleAbductionSelected(index) }} >
                                    <p>{sighting.obj.date.split("T")[0]}: {sighting.obj.city.split(" ")[0]}</p>
                                    <p>{sighting.obj.shape}: {sighting.obj.summary.substring(0, 25)}...</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {this.state.selectedAbduction !== '-' ? (
                        <div className="focusedAbductionContainer">
                            <div className="cityAbductionsHeader">
                                {this.state.sightings[this.state.selectedAbduction].obj.shape} - {this.state.sightings[this.state.selectedAbduction].obj.date.split("T")[0]}: {this.state.sightings[this.state.selectedAbduction].obj.city}
                            </div>
                            <div className="focusedAbductionContent">
                                <p style={{ 'fontStyle': 'italic' }}>"{this.state.sightings[this.state.selectedAbduction].obj.summary}"</p>
                                <p>{this.state.selectedFullSummary}</p>
                            </div>
                        </div>
                    ) : (
                            <p className="instructions">Click any result to see more. All details have been entered by users of <a href="http://www.nuforc.org/">this site</a></p>
                        )}

                </div>
            );
        }
    }
}

export default CityDetail;
