import React, { useEffect } from 'react';
import './App.css';
import Autocomplete from "./Autocomplete";


const App = (props) => {
  var foodArr = [];

  const fetchAll = () => {
    fetch(props.initAction, {
        method: props.method,
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': true
        }
    })
    .then(response => response.json())
    .then(data => {
      if (data.length == 0) {
        foodArr.push("An error has occurred: Please reload the page");
      } else {
          var disp = "Display_Name"
          for (let i=0; i<(data.length); i++) {
            foodArr.push(data[i][disp]);
          }
      }
    })
    .catch(function() {
      console.log("error");
      foodArr.push("An error has occurred: Please reload the page" );
    });

  };

  useEffect(fetchAll, []);

  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet"></link>
      <Autocomplete
        method={props.method}
        initAction={props.initAction}
        submitAction={props.submitAction}
        suggestions={foodArr}/>
    </div>
  );
}

App.defaultProps = {
    initAction: 'http://localhost:5000/api/getall',
    submitAction: 'http://localhost:5000/api/search',
    method: 'get'
};

export default App;
