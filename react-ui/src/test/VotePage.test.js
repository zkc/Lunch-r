import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
// import ReactTestUtils from 'react-dom/test-utils';

import VotePage from '../component/VotePage';

const fake_socket = {
  emit: jest.fn(),
  on: jest.fn()
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <VotePage socket={fake_socket}/>
    </BrowserRouter>
    , div);
});

it('displays enter icon on first load', () => {
  const wrapper = mount(<BrowserRouter><VotePage socket={fake_socket}/></BrowserRouter>)
  const optionContainer = wrapper.find('.option-container')
  expect(optionContainer.length).toBe(1)
  expect(optionContainer.text()).toBe('Collecting Votes')
})
