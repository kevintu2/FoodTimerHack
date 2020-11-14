import logo from './logo.svg';
import './App.css';
import Frontpage from './components/frontpage';
import React, {Component} from 'react';

class App extends Component {
  render (){
    return(
    <div className="App">

        <Frontpage/>

        
    </div>
    );
  }
  
}

export default App;
