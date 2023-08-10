import React from "react";
import axios from "axios";

const LOCATION_IQ_API_KEY = import.meta.env.VITE_LOCATION_IQ_API_KEY;
console.log(LOCATION_IQ_API_KEY);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      cityLon: "",
      cityLat: "",
      cityName: "",
    };
  }

  handleExplore = async (event) => {
    event.preventDefault();
    let result = await axios.get(
      `https://us1.locationiq.com/v1/search?key=${LOCATION_IQ_API_KEY}&q=${this.state.cityName}&format=json`
    );
    console.log(result);
    this.setState({
      displayName: result.data[0].display_name,
      cityLon: result.data[0].lon,
      cityLat: result.data[0].lat,
    });
    console.log(this.state);
    let result2 = await axios.get(
      "http://localhost:3001/weather?searchQuery=Paris"
    );
    console.log(result2);
    this.setState({
      valid_date: result2.data[0].valid_date,
      description: result2.data[0].description,
    });
  };
  handleChange = (event) => {
    this.setState({
      cityName: event.target.value,
    });
  };

  render() {
    // let locationList = this.state.location.map((p) => <li>{p.name}</li>);
    console.log(this.state);
    return (
      <>
        <h3> {this.state.displayName} </h3>
        <p> Latitude {this.state.cityLat} </p>
        <p> Longitude {this.state.cityLon} </p>
        <p> Date {this.state.valid_date}</p>
        <p>Description{this.state.description}</p>
        <img
          src={`https://maps.locationiq.com/v3/staticmap?key=${LOCATION_IQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=18`}
        />

        {/* <ul> */}
        {/* {locationList} */}
        {/* </ul> */}

        <form onSubmit={this.handleExplore}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.cityName}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default App;
