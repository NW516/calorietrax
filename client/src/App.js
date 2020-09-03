import React, { Component } from 'react';
import './App.css';

export default class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      searchTerm: '',
      errorMsg: ''
    };
  }

  onChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  handleClear() {
    this.setState({
      searchTerm: '',
      errorMsg: ''
    });
  }

  onSubmit(e) {
      e.preventDefault();
      fetch(this.props.action, {
          method: this.props.method,
          credentials: 'same-origin',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Origin': true
          },
          body: JSON.stringify({"searchTerm": this.state.searchTerm})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data === "Invalid URL") {
          this.setState({errorMsg: data});
        } else {
          this.setState({searchTerm: data.searchTerm});
        }
      });

      this.setState({searchTerm: ''});
  }


  componentDidMount() {
    //fetch('/users')
    //  .then(res => res.json())
    //  .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet"></link>
        <div className="logo-container">
          <img src="./Calorie.png" alt="calorie trax logo" className="logo"/>
        </div>
        <form
          id="url-entry"
          action={this.props.action}
          method={this.props.method}
          onSubmit={(e) => this.onSubmit(e)}
          className="search-input-container">
          <label>
            <span className="search-input-description">Search food:</span>
            <input onChange={(e) => this.onChange(e)} type="text" name="searchTerm" className="search-input" /><br/>
          </label>
          <div className="button-container">
            <button>Submit</button>
            <input type="reset" onClick={() => this.handleClear()} value="Clear"/>
          </div>
        </form>
      </div>
    );
  }
}

App.defaultProps = {
    action: 'http://localhost:5000/api/genurl',
    method: 'post'
};
