import React from 'react'
import './Weather.css'

export default class Weather extends React.Component {
     render() {
         return (
             <ul>
                 <li><span>Ветер</span> <em>{this.props.data.wind.speed} м/c</em></li>
                 <li><span>Облачность</span> <em>{this.props.data.weather[0].description}</em></li>
                 <li><span>Давление</span> <em>{this.props.data.main.pressure} гПа</em></li>
                 <li><span>Влажность</span> <em>{this.props.data.main.humidity} %</em></li>
                 <li><span>Координаты</span> <em>[{this.props.data.coord.lon}, {this.props.data.coord.lat}]</em></li>
             </ul>
         )
     }
}