import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import App from '../component/App';

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


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    , div);
});

it('has 3 routes', () => {
  const wrapper = mount(<BrowserRouter><App /></BrowserRouter>)
  expect(wrapper.find('Route').length).toBe(3)
});

it('puts a user_id into localStorage on load', () => {
  mount(<BrowserRouter><App /></BrowserRouter>)
  expect(localStorageMock.getItem('lunchR') && true).toBe(true)
});
