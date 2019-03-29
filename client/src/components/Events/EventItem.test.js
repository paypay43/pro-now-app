import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EventItem from './EventItem';

describe(`EventItem component`, () => {
  it('renders EventItem', () => {
    const wrapper = shallow(<EventItem />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EventItem />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
