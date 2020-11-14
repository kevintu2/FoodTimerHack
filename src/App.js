
import './App.css';
import Frontpage from './components/frontpage';
import React, { Component } from 'react';
import firebase from './components/firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      quantity: '',
      foodname: '',
      expDate: '',
      inFridge: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      Quantity: this.state.quantity,
      Food: this.state.foodname,
      ExpDate: this.state.expDate


    }
    itemsRef.push(item);
    this.setState({
      quantity: '',
      foodname: '',
      expDate: ''
    });
  }
  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          Quantity: items[item].Quantity,
          Food: items[item].Food,
          ExpDate: items[item].ExpDate,
        });

      }
      this.setState({
        inFridge: newState
      });
    });
  }
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  alertSpoil() {
    let current = Date.now();
    for (let item in inFridge) {
      if (item.ExpDate-current <86400000) {
        alert(item.Food)
      }
    }
  }
  render() {
    return (
      <div className="App">

        <header>
          <div className='wrapper'>
            <h1>Food Timer</h1>

          </div>
        </header>
        <div className='container'>
          <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="foodname" placeholder="Add a Food" onChange={this.handleChange} value={this.state.foodname} required />
              <input type="text" name="quantity" placeholder="Enter Quantity" onChange={this.handleChange} value={this.state.quantity} required />
              <input type="date" name="expDate" placeholder="Enter Expiration Date" onChange={this.handleChange} value={this.state.expDate} required />
              <button>Add Food</button>
            </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
              </ul>
            </div>
          </section>
        </div>
        <section className='display-item'>
          <div className="wrapper">
            <ul>
              {this.state.inFridge.map((fooditem) => {
                return (
                  <li key={fooditem.id}>
                    <h3>{fooditem.Food}</h3>
                    <p>Number of food:{fooditem.Quantity}</p>
                    <p>Expires on: {fooditem.ExpDate}</p>
                    <button onClick={() => this.removeItem(fooditem.id)}>Remove Food </button>
                  </li>
                  
                )
              })}
            </ul>
          </div>
        </section>


      </div >

    );
  }

}

export default App;
