import React from 'react'
import renderer from 'react-test-renderer'
import Loader from '../components/loader/Loader'

it('Loader rendering', () => {
    let component = renderer.create(
        <Loader />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
});