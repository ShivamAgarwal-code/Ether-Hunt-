import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './components/Home';

const App = () => {
  return (
    <Provider store={store}>
      <div className="flex justify-center items-center h-screen w-screen" >
        <Home />
      </div>
    </Provider>
  )
}

export default App
