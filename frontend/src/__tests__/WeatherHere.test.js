import React from 'react'
import renderer from 'react-test-renderer'
import '@babel/polyfill'
import {applyMiddleware, createStore} from "redux";
import reducer from "../store/reducers/reducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import WeatherHere from "../components/weatherHere/WeatherHere";

const {act} = renderer;

const get = (url, params) => {
    return Promise.resolve({
            "data": {
                "coord": {
                    "lon": params.params.lon,
                    "lat": params.params.lat
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
                "name": "name",
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

it('Weather here rendering', async () => {
    let axios = {
        get: get
    };

    let navigator = {
        geolocation: {
            getCurrentPosition: (success, error) => {
                let position = {
                    coords: {
                        latitude: 123,
                        longitude: 321
                    }
                };

                success(position)
            }
        }
    };

    let component = renderer.create(
        <div></div>
    );

    await act(() => {
        component = renderer.create(
            <Provider store={store}>
                <WeatherHere axios={axios} navigator={navigator}/>
            </Provider>
        );
    });


    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
});

it('Weather here rendering position error', async () => {
    let axios = {
        get: get
    };

    let navigator = {
        geolocation: {
            getCurrentPosition: (success, error) => {
                error()
            }
        }
    };

    let component = renderer.create(
        <div></div>
    );

    await act(() => {
        component = renderer.create(
            <Provider store={store}>
                <WeatherHere axios={axios} navigator={navigator}/>
            </Provider>
        );
    });


    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
});
