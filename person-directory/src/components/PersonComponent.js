import React from "react";

// props is literally just getting data from a parent to child
function PersonComopnent (props){
    return(
  <tr>
      <th scope="row">Image</th>
      <td>{props.first}</td>
      <td>{props.last}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
    </tr>
)}

export default PersonComopnent;