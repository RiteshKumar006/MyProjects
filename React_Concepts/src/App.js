import React, {Component} from "react";
import Item from "./Item";

class App extends Component {
  add = e => {
    if (e.keyCode === 13) {
      // When the enter key is pressed
      // Update the state with the new item
      e.target.value = "";
    }
  };
  render() {
    return (
      <div className="app">
        <div className="input-holder">
          <input
            placeholder="Type an item and press enter"
            onKeyUp={this.add}
          />
        </div>
        <div className="items-holder">
          <Item name="Ice cream" />
          <Item name="Chocolates" />
        </div>
      </div>
    );
  }
}

export default App;
