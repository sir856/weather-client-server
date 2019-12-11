import React from 'react'
import './WeatherHere.css'
import City from "../city/City"
import FavouriteCityList from "../favouriteCityList/FavouriteCityList"

export default class WeatherHere extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lon: 0
        };
    }

    componentDidMount() {
        this.getLocation();
    }

    getLocation() {
        this.props.navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this));
    }

    error(){
        this.setState({lat: 56, lon: 38});
    }
    success(position){

        this.setState({lat: position.coords.latitude, lon: position.coords.longitude});
    }

    render() {
        console.log('lat: ' + this.state.lat + ' lon: ' + this.state.lon);
        return (
            <div>
                <div className="weather_here">
                    <div className="header">
                        <div className="part">Погода здесь</div>
                        <button className="button" onClick={this.getLocation.bind(this)}>Обновить геолокацию</button>
                    </div>
                    <City axios={this.props.axios} lat={this.state.lat} lon={this.state.lon}/>
                </div>

                <FavouriteCityList axios={this.props.axios}/>
            </div>
        );
    }
}