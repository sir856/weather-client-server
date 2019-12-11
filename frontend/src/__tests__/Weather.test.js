import React from 'react'
import renderer from 'react-test-renderer'
import Weather from '../components/weather/Weather'

let data = {
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
    "name": "Saint Petersburg",
    "cod": 200
};

it('Loader rendering', () => {
    let component = renderer.create(
        <Weather data={data} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
});