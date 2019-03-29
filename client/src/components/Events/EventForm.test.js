import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EventForm from './eventForm';

describe(`EventForm component`, () => {
  /*it('renders loginform', () => {
    const wrapper = shallow(<EventForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });*/

  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EventForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
