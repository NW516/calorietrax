import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import './Autocomplete.css';
import SearchResults from './SearchResults';

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      // Search results
      searchResults: "",
      // Did the user submit their query?
      submitted: false
    };
  }

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText    });
  };

  handleClear = () => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
      searchResults: "",
      submitted: false
    });
  }

  handleSubmit = (e) => {

      e.preventDefault();
      const params = { q: this.state.userInput };
      const paramString = new URLSearchParams(params);
      const formAction = `${this.props.submitAction}?${paramString.toString()}`;



      fetch(formAction, {
          method: this.props.method,
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
        const wideCol = {
          width: '38%'
        };
        const narrowCol = {
          width: '20%'
        };

        this.setState({ submitted: true} )
        this.setState({ searchResults: data.map(item => {
            return (
                    <div className="w3-row w3-border">
                      <div className="w3-col w3-small" style={wideCol}>{item["Display_Name"]}</div>
                      <div className="w3-col w3-small" style={narrowCol}>{item["Portion_Amount"]} {item["Portion_Display_Name"]}</div>
                      <div className="w3-col w3-small" style={narrowCol}>{Math.round(item["Calories"])}</div>
                      <div className="w3-col w3-small" style={narrowCol}>{Math.round(item["Solid_Fats"])}</div>
                    </div>
                  )
          })
        })
        if (data.length === 0) {
          this.setState({ searchResults: "No results" });
        }
      }) 
      .catch(function() {
        console.log("error");
        this.setState({ searchResults: "An error has occurred: Please try again." });
      });

      this.setState({ userInput: '' });
  }

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      handleClear,
      handleSubmit,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <table className="suggestions"><tbody>
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <tr key={suggestion}><td
                  className={className}
                  key={suggestion}
                  onClick={(e) => onClick(e)}
                >
                  {suggestion}
                </td></tr>
              );
            })}
          </tbody>
          </table>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
      <div>
        <div className="logo-container">
            <img src="./Calorie.png" alt="calorie trax logo" className="logo"/>
        </div>
      </div>
      <div>
        <form
          id="url-entry"
          action={this.props.submitAction}
          method={this.props.method}
          onSubmit={(e) => handleSubmit(e)}
          className="search-input-container">

        <span className="subhead">
          <p>
          Get accurate nutritional information-- calories, fat content and more-- for over 1,000 common food and beverage items.
          </p>
        </span>
        <div className="w3-row">
          <div className="w3-col s3 l2">
            <label>
              <span className="search-input-description">Search food:  </span>
            </label>
          </div>
          <div className="w3-col s6 l4">
            <input
              type="text"
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
              className="search-input"
            />
            {suggestionsListComponent}
            <br/>
            <div className="button-container">
              <button className="button">Submit</button>
              <input
                type="reset"
                onClick={() => handleClear()}
                value="Clear"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
    <div className="w3-row">
        <SearchResults
        results={this.state.searchResults}
        submitted={this.state.submitted}
        />
    </div>
    </Fragment>
    );
  }
}

export default Autocomplete;
