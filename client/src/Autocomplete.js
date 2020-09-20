import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import './Autocomplete.css';
import './App.css';

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
      userInput: ""
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
      userInput: ""
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
        console.log(data);
        var disp = "Display_Name"
        for (let i=0; i<(data.length); i++) {
         console.log(data[i][disp]);
        }
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

      <form
        id="url-entry"
        action={this.props.submitAction}
        method={this.props.method}
        onSubmit={(e) => handleSubmit(e)}
        className="search-input-container">

        <div className="logo-container">
          <img src="./Calorie.png" alt="calorie trax logo" className="logo"/>
        </div>

        <span className="subhead">
        Get the calories, fat, carbs, protein and more for over 37,000 food and drinks.
        </span>

        <label>
          <span className="search-input-description">Search food:  </span>
        </label>

        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          className="search-input"
        />
        {suggestionsListComponent}

        <div className="button-container">
          <button>Submit</button>
          <input type="reset" onClick={() => handleClear()} value="Clear"/>
        </div>
      </form>

      </Fragment>
    );
  }
}

export default Autocomplete;
