import React, { Component, createRef } from "react";
import  debounce  from "lodash.debounce";
import Input from "./components/Input";
import SetUnits from "./components/SetUnits";
import WeatherReport from "./components/WeatherReport";
import Search from "./components/Search";

class App extends Component {
  state={
     searchResult: [],
     error:false,
     isLoading:true,
     selectedLocId: 0,
     tempUnit:"celsius",
     weatherData:{}

  }

  searchRef = createRef();
  componentDidMount(){
    this.searchRef.current.focus();
  }

  componentDidUpdate(_,prevState){
    if(prevState.selectedLocId !== this.state.selectedLocId || this.state.tempUnit !== prevState.tempUnit){
      this.getWeather();
    }
  }
  searchLocations = debounce(async (value) =>{
   await fetch(`https://api.weatherserver.com/weather/cities/${value}`)
    .then((res) => res.json())
    .then((result) => this.setState({searchResult: result.results, isLoading:false}))
    .catch(() => this.setState({error: true}))
  },200)

  getWeather =() =>{
    this.setState({
      searchResult:[],
      isLoading: true,
      error: false
    })

    this.searchRef.current.value = "";
    fetch(`https://api.weatherserver.com/weather/current/${this.state.selectedLocId}/${this.state.tempUnit }`)
    .then((res) => res.json())
    .then((result) =>  this.setState({weatherData: result, isLoading:false}))
    // .then((result) => console.log(result))
    .catch(() => this.setState({error: true}))
  }

   render() {
    console.log(this.state.selectedLocId)
    return (
      <div className="weather-app">
        <h1>WeatherWatch</h1>
        <Input label="LOCATION" onInput={e => this?.searchLocations(e.target.value)} inputRef={this.searchRef } />
        {console.log(this.state.searchResult.length )}
        {this.state.searchResult.length > 0 && (
          <Search data={this.state.searchResult} selectLocation={(id) =>  this.setState({selectedLocId: id})}  />
        )}  
        <SetUnits value={this.state.tempUnit} onSet={(e) => this.setState({tempUnit: e.target.value})} />
          {this.state.isLoading ? <div className="is-loading" />  : <WeatherReport weatherData={this.state.weatherData} units={this.state.tempUnit} />}
      </div>
    );
  }
}

export default App;
