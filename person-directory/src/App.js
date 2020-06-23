import PersonComponent from "./components/PersonComponent"
import React, { Component } from "react";
import API from "./utils/API";

// state is used when data is going to change, usually through user interaction - 
class App extends Component {
  state = {
    persons: [],
    search: ""
  };

 
  componentDidMount() {
    API.search()
    .then(res => { 
      console.log(res); 
      this.setState({ persons: res.data.results })
    })
    .catch(err => console.log(err));
  }

 
  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    },
    () => console.log(this.state)
    );
  };

  // When the form is submitted, search the OMDB API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchMovies(this.state.search);
  };

  render() {
  return (<div>
{/* filter with map */}
    <input
          onChange={this.handleInputChange}
          value={this.search}
          // match state key to inut name
          name="search"
          type="text"
          className="form-control"
          placeholder="Search Person Directory"
          id="search"
        />
    <table class="table"> 
   {/* table header can be a component here without props b/c it's not getting data */}
     <thead>
      <tr>
        <th scope="col"></th> 
        {/* putimage here */}
        <th scope="col"></th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Email</th>
        <th scope="col">Phone Number</th>
     </tr>
    </thead>
   <tbody> 
     { this.state.persons.map(person => (
     <PersonComponent 
    //  image here
     key = {person.login.uuid}
     picture = {person.picture.medium}
     first = {person.name.first}
     last = {person.name.last}
     email ={person.email}
     phone = {person.phone}
     />
     )
    )}
   </tbody>
  </table>

    
  </div>)
      
  }}


export default App;
