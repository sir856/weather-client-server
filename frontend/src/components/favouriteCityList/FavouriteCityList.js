import React from 'react'
import FavouriteCity from '../favouriteCity/FavouriteCity'
import Error from '../error/Error';
import './FavouriteCityList.css'

class FavouriteCityList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            items: []
        }

    }

    componentDidMount() {
        this.props.axios.get("http://localhost:8080/favourites")
            .then(response => {
                this.setState({
                    items: response.data
                });
            })
            .catch(err => {
                this.error("Ошибка", "Сервер недоступен")
            });
    }

    addItem(event) {
        let name = event.target['city'].value;
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        this.props.axios.post("http://localhost:8080/favourites", null, {
            params: {
                city: name,
            }
        })
            .then(response => {
                this.setState({
                    items: [
                        ...this.state.items,
                        {
                            name: name
                        }
                    ]
                });
            })
            .catch(error => {
                switch (error.response.status) {
                    case 500:
                        this.error(name, "Проблема с БД");
                        break;
                    case 400:
                        this.error(name, "Город " + name + " уже добавлен");
                        break;
                    default:
                        this.error(name, "Неизвестная ошибка");
                }

            });

        event.preventDefault();
    }

    deleteItem(name) {
        this.props.axios.delete("http://localhost:8080/favourites", {
            params: {
                city: name,
            }
        });


        this.setState({
            items: this.state.items.filter(item => {
                return item.name !== name
            })
        })
    }

    getItems() {
        let items = [];
        this.state.items.forEach(item => {
            items.push(<FavouriteCity key={item.name} name={item.name} cityNotFound={this.error.bind(this)} axios={this.props.axios} delete={this.deleteItem.bind(this)}/>);
        });
        if (this.state.error !== null) {
            items.push(<Error key={this.state.error.name} message={this.state.error.message}/>);
        }
        return items;
    }

    error(name, message) {
        this.setState({error: {
                name: name,
                message: message
            }})
    }

    render() {
        return (
            <div className="container">
                <div className="header">
                    <div className="part">Избранное</div>

                    <form onSubmit={this.addItem.bind(this)}>
                        <input name="city" type="text" placeholder="Введите название города..."/>
                        <button className="itemsButton" type="submit">+</button>
                    </form>
                </div>

                <div className="items">{this.getItems()}</div>
            </div>
        );
    }
}

export default FavouriteCityList;