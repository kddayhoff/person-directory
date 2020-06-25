import PersonComponent from "./components/PersonComponent"
import React, { Component } from "react";
import API from "./utils/API";


//third param in function to search by specific key, reps whatever key in the column we want to search --cleaning the array/filter data 
//const newPersonKey = function ()

const ascCompareByName =  function(a, b, newPersonKey) {
 //sort by first name ascending  --> to descend switch -1 and 1
  if (a[newPersonKey].toUpperCase() < b[newPersonKey].toUpperCase()) {
    return -1;
  }
  if (a[newPersonKey].toUpperCase() > b[newPersonKey].toUpperCase()) {
    return 1;
  }
  // names must be equal
  return 0;
}

const descCompareByName =  function(a, b, newPersonKey) {
  //sort by first name ascending  --> to descend switch -1 and 1
   if (a[newPersonKey].toUpperCase() < b[newPersonKey].toUpperCase()) {
     return 1;
   }
   if (a[newPersonKey].toUpperCase() > b[newPersonKey].toUpperCase()) {
     return -1;
   }
   // names must be equal
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
      this.setState({ persons: res.data.results.map(person => ( {
        first: person.name.first,
        last: person.name.last,
        

      })) })
      //////////////////////////////////////////////
      //map by result from keys from table needed --- this will essentiall become our newPersonKey
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
  
  handleSortBy = (sortKey) => {
  this.setState({
    persons: this.state.persons.sort(this.state.sortOrder === "ASC" ? (a, b) => ascCompareByName(a, b, sortKey) : (a, b)=> descCompareByName(a, b, sortKey)),
    sortOrder: this.state.sortOrder === "ASC" ? "DSC" : "ASC", 
  }) 
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
        <th scope="col" onClick={this.handleSortBy("first")}>First</th>
        <th scope="col">Last</th>
        <th scope="col" onClick={this.handleSortBy("email")}>Email</th>
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
