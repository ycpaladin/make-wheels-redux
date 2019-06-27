import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from './redux/react-redux'
import { store } from './redux/store';
import List from './Components/List'
import Comp from './Components/Com'

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <List />
      </Provider>
    </div>
  );
}

export default App;
