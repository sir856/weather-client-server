import React from 'react'
import Loader from '../loader/Loader';
import Error from "../error/Error";
import Weather from "../weather/Weather"
import './FavouriteCity.css'

class FavouriteCity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loading: true,
        }
    }

    componentDidMount() {
        this.props.axios.get("http://localhost:8080/weather", {
            params: {
                city: this.props.name,
            }
        })
            .then(response => {
                this.setState({
                    data: response.data,
                    loading: false,
                });
            })
            .catch(error => {

                let msg = "Сервер недоступен";
                if (error.response) {
                    switch(error.response.status) {
                        case 404:
                            this.delete();
                            this.props.error(this.props.name, "Город " + this.props.name + " не найден");
                            return;
                        case 504:
                            msg = "Проблемы с интернет соединением";
                            break;
                        default:
                            msg = "Проблемы с API"
                    }
                }

                this.setState({
                    data: msg,
                    loading: false,
                    error: true
                });

            });
    }

    delete() {
        this.props.delete(this.props.name)
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
                    <Error message={this.state.data} delete={this.delete.bind(this)} name={this.props.name}/>
                )
            }
            return(
                <div className="loader" >
                    <div className="header">
                        <b>{this.props.name}</b>
                        <span className="item-temp">{this.state.data.main.temp + " \u2103"}</span>
                        <img className="item-icon" src={'//openweathermap.org/img/wn/' + this.state.data.weather[0].icon + '@2x.png'}
                             alt="img"/>
                        <button className="itemsButton" id={this.props.name} onClick={this.delete.bind(this)}>x</button>
                    </div>
                    <div className="item-entry">
                        <Weather data={this.state.data}/>
                    </div>
                </div>
            );
        }

    }
}

export default FavouriteCity