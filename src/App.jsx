import React from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";

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
      cityDescription: "",
      cityDate: "",
      cityWeather: "",
      error: null,
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
      valid_date1: result2.data[1].valid_date,
      description1: result2.data[1].description,
      valid_date2: result2.data[2].valid_date,
      description2: result2.data[2].description,
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
        <ListGroup>
          <ListGroup.Item> Latitude: {this.state.cityLat} </ListGroup.Item>
          <ListGroup.Item> Longitude: {this.state.cityLon} </ListGroup.Item>
          <ListGroup.Item> Date: {this.state.valid_date}</ListGroup.Item>
          <ListGroup.Item>Description: {this.state.description}</ListGroup.Item>
          <ListGroup.Item> Date: {this.state.valid_date1}</ListGroup.Item>
          <ListGroup.Item>
            Description: {this.state.description1}
          </ListGroup.Item>
          <ListGroup.Item> Date: {this.state.valid_date2}</ListGroup.Item>
          <ListGroup.Item>
            Description: {this.state.description2}
          </ListGroup.Item>
        </ListGroup>
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
