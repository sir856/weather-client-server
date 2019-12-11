import React from "react";
import './loader.css'
const img = require('../../resources/loading.gif');

export default class Loader extends React.Component {
    render() {
        return (
            <div className='loader'>
                <b>Загрузка</b>
                <img className='loading-icon' src={img} alt=""/>
            </div>
        );
    }
}
