import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  render() {
  	// normal javascript comment
    return (
  		<form className="store-selector">
  			{ /* jsx comment */ }
  			<h2>Please Enter a Store</h2>
  			<input type="text" required placeholder="Store Name" defaultValue={getFunName()} />
  			<button type="submit">Visit Store &rarr;</button>
  		</form>
  	)
  }
}

export default StorePicker;