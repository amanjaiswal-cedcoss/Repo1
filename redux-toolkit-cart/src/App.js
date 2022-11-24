import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Cart from './features/Cart/Cart';
import { store } from './app/store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Cart/>
    </div>
    </Provider>
  );
}

export default App;
