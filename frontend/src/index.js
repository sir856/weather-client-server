import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import WeatherHere from './components/weatherHere/WeatherHere'


ReactDOM.render(
    <WeatherHere axios={axios} navigator={navigator}/>,
    document.getElementById('root')
);


