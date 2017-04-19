import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
// import ReactTestUtils from 'react-dom/test-utils';

import NewGroup from '../component/NewGroup';

const fake_socket = {
  emit: jest.fn(),
  on: jest.fn()
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NewGroup socket={fake_socket}/>
    </BrowserRouter>
    , div);
});

it('displays loading message on first load', () => {
  const wrapper = mount(<BrowserRouter><NewGroup socket={fake_socket}/></BrowserRouter>)
  const optionContainer = wrapper.find('.enter')
  expect(optionContainer.length).toBe(1)
})

