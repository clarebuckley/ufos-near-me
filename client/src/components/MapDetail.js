import React, { Component } from 'react';
import axios from 'axios';
import RealMap from './RealMap'


/** Responsible for rendering the map displaying probability of getting abducted
 * */
class MapDetail extends Component {
    constructor() {
        super();
        this.state = {
            incidents: [],
            sightings: []
        }
    }

    async componentDidMount() {
        axios.get('https://cors-anywhere.herokuapp.com/http://ufo-api.herokuapp.com/api/sightings/search?from=200/5/5&to=2016/8/7&shape=triangle&city=new%20york&state=ny&limit=50&skip=0')
            .then((res) => {
                const sightings = res.data;
                this.setState({ sightings: sightings });
            })
        
    };


    render() {
        return (
            <RealMap sightings={this.state.sightings} />
        );
    }
}

export default MapDetail;
