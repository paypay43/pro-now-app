import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RegisterForm from './RegisterForm';

describe(`RegisterForm component`, () => {
  it('renders register form', () => {
    const wrapper = shallow(<RegisterForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RegisterForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
