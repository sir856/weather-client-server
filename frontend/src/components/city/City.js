import React from 'react'
import Loader from '../loader/Loader';
import Error from "../error/Error";
import Weather from "../weather/Weather";
import "./City.css";
import {breakStatement} from "@babel/types";

export default class City extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                loading: true,
                error: false
            });
            this.getData();
        }

    }

    getData() {
        this.props.axios.get("http://localhost:8080/weather/coordinates", {
            params: {
                lat: this.props.lat,
                lon: this.props.lon
            }
        })
            .then(response => {
                this.setState({
                    data: response.data,
                    loading: false,
                    error: false
                })
            })
            .catch(error => {
                console.log(error);
                let msg = "Сервер недоступен";
                if (error.response) {
                    switch (error.response.status) {
                        case 404:
                            msg = "Город не найден";
                            break;
                        case 504:
                            msg = "Проблемы с интернет соединением";
                            break;
                        default:
                            msg = "Проблемы с API";
                    }

                }

                this.setState({
                    data: msg,
                    loading: false,
                    error: true
                })
            });
    }

    render() {
        if (this.state.loading) {
            return (
                <Loader/>
            )
        }
        else {
            if (this.state.error) {
                return (
                    <Error message={this.state.data}/>
                )
            }
            return(
                <div className="weather_here_item" >
                    <div className="about">
                        <b className="name">{this.state.data.name}</b>
                        <span className="temp">{this.state.data.main.temp + " \u2103"}</span>
                        <img className="icon" src={'//openweathermap.org/img/wn/' + this.state.data.weather[0].icon + '@2x.png'}
                             alt="img"/>
                    </div>
                    <div className="entry">
                        <Weather data={this.state.data}/>
                    </div>
                </div>
            );
        }

    }
}