import React, {Component} from "react";
import CurrencyConvertor from "./component/currencyConvertor";
import openRates from "./services/openRates";

class App extends Component {
  state={
    from: "USD",
    to: "INR",
    rate: 1,
    fromAmt:1,
    toAmt:1
  }

  componentDidMount(){
    this.fetchRates(this.state.from, this.state.to)
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.from !== this.state.from || prevState.to !== this.state.to){
      this.fetchRates(this.state.from, this.state.to)
    }
  }

  fetchRates = async(base='USD', symbol="INR") =>{
    openRates(base,symbol).then((data) => {
      this.setState({rate: data.rate});
    });
    
  }

  
  setAmount = (amount, type) => {
    if (type === 'from') {
      this.setState({
        fromAmt: amount,
        toAmt:null
      });
    } else {
      this.setState({
        toAmt: amount,
        fromAmt:null
      });
    }
  };

  computeResult = (type) => {
    let {fromAmt, toAmt, rate} = this.state;
    if(fromAmt !== null){
      toAmt = parseFloat(fromAmt * rate).toFixed(2);
    }else {
      fromAmt= parseFloat(toAmt / rate).toFixed(2);
    }
    return type === 'from' ? fromAmt : toAmt;  

  }

 
  render() {
    console.log("state", this.state)
    return (<div className="currency-converter">
        {/* <h1>Currency Convertor</h1> */}
      <CurrencyConvertor symbol={this.state.from} setSymbol={(evt) => this.setState({from: evt})} setAmount={(evt) => this.setAmount(evt, 'from')} amount={this.computeResult('from')}/>
      <CurrencyConvertor symbol={this.state.to}  setSymbol={(evt)=>  this.setState({to: evt})} setAmount={(evt) => this.setAmount(evt, 'to')} amount={this.computeResult('to')} />
    </div>);
  }
}

export default App;
