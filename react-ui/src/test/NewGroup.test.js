import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
// import ReactTestUtils from 'react-dom/test-utils';

import NewGroup from '../component/NewGroup';

//ty stack overflow
var localStorageMock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

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

