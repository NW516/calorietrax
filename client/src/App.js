import React, { useState, useRef } from 'react';
import './App.css';


const App = (props) => {
  let textInput = useRef('');

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = () => {
    console.log(textInput.current.value);
    setSearchTerm(textInput.current.value);
  }

  const handleClear = () => {
    setSearchTerm('');
    setErrorMsg('');
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      fetch(props.action, {
          method: props.method,
          credentials: 'same-origin',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Origin': true
          },
          body: JSON.stringify({"searchTerm": searchTerm})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data === "Invalid URL") {
          setErrorMsg(data);
        } else {
          setSearchTerm(data.searchTerm);
        }
      });

      setSearchTerm('');
    }

    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet"></link>
        <form
          id="url-entry"
          action={props.action}
          method={props.method}
          onSubmit={(e) => handleSubmit(e)}
          className="search-input-container">

          <div className="logo-container">
            <img src="./Calorie.png" alt="calorie trax logo" className="logo"/>
          </div>

          <label>
            <span className="search-input-description">Search food:  </span>
            <input type="text" className="search-input" ref={textInput} onChange={handleChange}/>
          </label>

          <div className="button-container">
            <button>Submit</button>
            <input type="reset" onClick={() => handleClear()} value="Clear"/>
          </div>
        </form>
      </div>
    );
  }

App.defaultProps = {
    action: 'http://localhost:5000/api/search',
    method: 'post'
};

export default App;
