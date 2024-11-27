import React, {Component} from "react";
import Item from "./Item";

class App extends Component {
  state={
    items:[
    {
      name:"Ice cream",
      id:1
    }
  ]}
  add = e => {
    if (e.keyCode === 13) {
      // When the enter key is pressed
      let newItem ={
        name: e.target.value,
        id: Date.now()
      }
      this.setState({
        items: [...this.state.items, newItem]
      })
      console.log(this.state.items) 
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
          { this.state.items.map(item =><Item name={item.name} key={item.id}/>)}
        </div>
      </div>
    );
  }
}

export default App;
