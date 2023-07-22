import React from "react";
import axios from "axios";

const location_IQ_API_KEY = 'pk.e8616f989bbc1c2df3379a98d3142369';
console.log(location_IQ_API_KEY);
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      cityLon: '',
      cityLat: '',
      cityName: ''
    }
  }

  handleExplore = async (event) => {
    event.preventDefault()
    let result = await axios.get(
      `https://us1.locationiq.com/v1/search?key=${location_IQ_API_KEY}&q=${this.state.cityName}&format=json`
    );
    console.log(result);
  this.setState({
    displayName: result.data[0].display_name,
    cityLon: result.data[0].lon,
    cityLat: result.data[0].lat
  }) 
    console.log(this.state);
  };
handleChange = (event) => {
  this.setState({
    cityName: event.target.value 
  })
}

  render() {
    // let locationList = this.state.location.map((p) => <li>{p.name}</li>);
    console.log(this.state);
    return (
      <>
        <h3> {this.state.displayName} </h3>
        <p> Latitude {this.state.cityLat} </p>
        <p> Longitude {this.state.cityLon} </p>
        <img src={`https://us1.locationiq.com/v1/search?key=${location_IQ_API_KEY}&q=${this.state.cityName}&format=json`} />
        {/* <ul> */}
          {/* {locationList} */}
        {/* </ul> */}
        
        <form onSubmit={this.handleExplore}>
        <label>
          Name:
          <input type="text" value={this.state.cityName} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        
      </>
    );
  }
}

export default App;
