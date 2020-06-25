import PersonComponent from "./components/PersonComponent"
import React, { Component } from "react";
import API from "./utils/API";


const ascCompareByName =  function(a, b) {
  let firstNameA = a.name.first.toUpperCase();
  let firstNameB = b.name.first.toUpperCase();
  if (firstNameA < firstNameB) {
    return -1;
  }
  if (firstNameA > firstNameB) {
    return 1;
  }
  return 0;
}

const descCompareByName =  function(a, b) {
  let firstNameA = a.name.first.toUpperCase();
  let firstNameB = b.name.first.toUpperCase();
   if (firstNameA < firstNameB) {
     return 1;
   }
   if (firstNameA > firstNameB) {
     return -1;
   }
   return 0;
 }

// state is used when data is going to change, usually through user interaction - 
class App extends Component {
  state = {
    persons: [],
    search: "",
    sortOrder: "ASC"
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

  // When the form is submitted, search the person directory API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchMovies(this.state.search);
  };
  
  handleSortByPerson = () => {
  this.setState({
    sortOrder: this.state.sortOrder === "ASC" ? "DSC" : "ASC", 
    persons: this.state.persons.sort(this.state.sortOrder === "ASC" ? ascCompareByName : descCompareByName)}) 
}

  render() {
    let searchVal = this.state.search.toLowerCase();
  return (
  <div>
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
    <table className="table table-hover"> 
   {/* table header can be a component here without props b/c it's not getting data */}
     <thead>
      <tr>
        <th scope="col"></th> 
        <th scope="col" onClick={this.handleSortByPerson}>First</th>
        <th scope="col">Last</th>
        <th scope="col">Email</th>
        <th scope="col">Phone Number</th>
     </tr>
    </thead>
   <tbody> 
 
     { this.state.persons.filter(person => this.state.search === "" || person.name.first.toLowerCase().includes
     (searchVal) || person.name.last.toLowerCase().includes
     (searchVal) || person.email.toLowerCase().includes
     (searchVal) || person.phone.toLowerCase().includes
     (searchVal)).map(personData=> ( 
     <PersonComponent 
     key = {personData.login.uuid}
     picture = {personData.picture.medium}
     first = {personData.name.first}
     last = {personData.name.last}
     email ={personData.email}
     phone = {personData.phone}
     />
     )
    )}
   </tbody>
  </table>    
  </div>
  )}
}


export default App;
