import React from 'react'
import renderer from 'react-test-renderer'
import Error from '../components/error/Error'

it('Error rendering', () => {
    let component = renderer.create(
        <Error message="message" />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
});

it('city error rendering', () => {
    let fun = () => {};
    let component = renderer.create(
        <Error message="message" delete={fun} name="name"/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
});