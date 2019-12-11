import React from 'react'
import renderer from 'react-test-renderer'
import FavouriteCityList from '../components/favouriteCityList/FavouriteCityList'
import '@babel/polyfill'
import {applyMiddleware, createStore} from "redux";
import reducer from "../store/reducers/reducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

const {act} = renderer;

const get = (url, params) => {
    if (params.params.q === "Error") {
        return Promise.reject({
                response: {
                    status: 404
                }
            }
        )
    }
    return Promise.resolve({
            "data": {
                "coord": {
                    "lon": 30.32,
                    "lat": 59.94
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04d"
                    }
                ],
                "base": "stations",
                "main": {
                    "temp": 276.91,
                    "pressure": 1016,
                    "humidity": 80,
                    "temp_min": 276.48,
                    "temp_max": 277.15
                },
                "visibility": 10000,
                "wind": {
                    "speed": 6,
                    "deg": 140
                },
                "clouds": {
                    "all": 90
                },
                "dt": 1573626054,
                "sys": {
                    "type": 1,
                    "id": 8926,
                    "country": "RU",
                    "sunrise": 1573624204,
                    "sunset": 1573652158
                },
                "timezone": 10800,
                "id": 498817,
                "name": params.params.q,
                "cod": 200
            }
        }
    );
};

let store;

beforeEach( ()=> {
    let persistedState = [{ name: "moscow"}, {name: "omsk"}];
    store = createStore(reducer, persistedState, applyMiddleware(thunk));
});

it('Favourite city list rendering', async () => {
    let axios = {
        get: get
    };

    let component = renderer.create(
        <div></div>
    );

    await act(() => {
        component = renderer.create(
            <Provider store={store}>
                <FavouriteCityList axios={axios}/>
            </Provider>
        );
    });


    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
});

it('Favourite city list add city',async () => {
    let axios = {
        get: get
    };

    let component = renderer.create(
        <div></div>
    );

    await act(() => {
        component = renderer.create(
            <Provider store={store}>
                <FavouriteCityList axios={axios}/>
            </Provider>
        );
    });

    await act(() => {
            let input = component.root.findByType('input');
            input.value = "new";
            let form = component.root.findByType('form');

            form.props.onSubmit({
                target: {
                    "city": input
                },
                preventDefault: () => {
                }
            });
        }
    );


    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


});

it('Favourite city list delete city',async () => {
    let axios = {
        get: get
    };

    let component = renderer.create(
        <div></div>
    );

    await act(() => {
        component = renderer.create(
            <Provider store={store}>
                <FavouriteCityList axios={axios}/>
            </Provider>
        );
    });


    let button = component.root.findByProps({ id : "moscow"});


    await act(() => {
            button.props.onClick();
        }
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


});

it('Favourite city list add city with not found error',async () => {
    let axios = {
        get: get
    };

    let component = renderer.create(
        <div></div>
    );

    await act(() => {
        component = renderer.create(
            <Provider store={store}>
                <FavouriteCityList axios={axios}/>
            </Provider>
        );
    });

    await act(() => {
            let input = component.root.findByType('input');
            input.value = "error";

            let form = component.root.findByType('form');

            form.props.onSubmit({
                target: {
                    "city": input
                },
                preventDefault: () => {
                }
            });
        }
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


});