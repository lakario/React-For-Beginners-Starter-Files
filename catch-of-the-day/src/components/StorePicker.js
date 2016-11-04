import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
	// constructor() {
	// 	super();
	// 	this.gotoStore = this.goToStore.bind(this);
	// }

	gotoStore(event) {
		event.preventDefault();
		// get text from input
		const storeId = this.storeInput.value;
		
		// change route from / to /store/:storeId
		console.log(`Going to: ${this.storeInput.value}`);
		this.context.router.transitionTo(`/store/${storeId}`)
	}

  render() {
  	// normal javascript comment
    return (
  		<form className="store-selector" onSubmit={this.gotoStore.bind(this)}>
  			{ /* jsx comment */ }
  			<h2><span>Please Enter a Store</span></h2>
  			<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input } } />
  			<button type="submit">Visit Store &rarr;</button>
  		</form>
  	)
  }
}

StorePicker.contextTypes = {
	router: React.PropTypes.object
}

export default StorePicker;