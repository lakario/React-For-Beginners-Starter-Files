import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import base from '../base'
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
   super();

   this.addFish = this.addFish.bind(this);
   this.updateFish = this.updateFish.bind(this);
   this.removeFish = this.removeFish.bind(this);
   this.loadSamples = this.loadSamples.bind(this);
   this.addToOrder = this.addToOrder.bind(this);
   this.removeFromOrder = this.removeFromOrder.bind(this);

   // initial state
   this.state = {
    fishes: {},
    order: {}
   };
  }

  componentWillMount() {
    // runs before App is first rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
      {
        context: this,
        state: 'fishes'
      });

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if (localStorageRef) {
      // update order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
  }

  addFish(fish) {
    // copy the state
    const fishes = {...this.state.fishes};
    // add new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes })
  }

  updateFish(key, fish) {
     // copy state
    const fishes = {...this.state.fishes};
    // update fish
    fishes[key] = fish;
    // set state
    this.setState({ fishes })
  }

  removeFish(key) {
    // copy state
    const fishes = {...this.state.fishes};
    // firebase needs us to set the key to null in order to delete
    fishes[key] = null;
    // set state
    this.setState({ fishes })
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    // copy the state
    const order = {...this.state.order}
    // update new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // set the state
    this.setState({ order });
  }

  removeFromOrder(key) {
    // copy the state
    const order = {...this.state.order}
    // update new number of fish ordered
    delete order[key];
    // set the state
    this.setState({ order });
  }

  render() {
    return (
  	   <div className="catch-of-the-day">
          <div className="menu">
            <Header tagline="Fresh Seafood Market"/>
            <ul className="list-of-fishes">
              {Object.keys(this.state.fishes)
                .map(key => 
                  <Fish 
                    key={key} 
                    index={key} 
                    details={this.state.fishes[key]} 
                    addToOrder={this.addToOrder}
                  />)} 
            </ul>
          </div>
          <Order 
            fishes={this.state.fishes} 
            order={this.state.order} 
            params={this.props.params}
            removeFromOrder={this.removeFromOrder} />
          <Inventory 
            fishes={this.state.fishes} 
            loadSamples={this.loadSamples} 
            addFish={this.addFish} 
            removeFish={this.removeFish}
            updateFish={this.updateFish}
            />
       </div>
  	)
  }
}

export default App;