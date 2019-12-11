import React from "react"
import './Error.css'

export default class Error extends React.Component {
    render() {
        if (this.props.delete) {
            return (
                <div className='loader'>
                    <div className="header">
                        <b>{this.props.name}</b>
                        <button className="itemsButton" id={this.props.name} onClick={this.props.delete}>x</button>
                    </div>
                    <i>{this.props.message}</i>
                </div>
            )
        }
        return (
            <div className='loader'>
                <b>Ошибка</b>
                <i>{this.props.message}</i>
            </div>
        );
    }
}