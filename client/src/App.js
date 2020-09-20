import React, { useEffect } from 'react';
import './App.css';
import Autocomplete from "./Autocomplete";


const App = (props) => {
  var foodArr = [];

  const fetchAll = () => {
    fetch("http://localhost:5000/api/getall", {
        method: 'get',
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
      if (data === "Invalid URL") {
        //setErrorMsg(data);
      } else {
          var disp = "Display_Name"
          for (let i=0; i<(data.length); i++) {
            console.log(data[i][disp]);
            foodArr.push(data[i][disp]);
          }
      }
    });

  };

  useEffect(fetchAll, []);

  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet"></link>
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
