import React from "react";

const SearchResults = (props) => {
  const wideCol = {
    width: '38%'
  };
  const narrowCol = {
    width: '20%'
  };
  const searchResults = props.results;
  const submitted = props.submitted;
  if (searchResults !== "" && searchResults !== "No results" && submitted == true) {
    return (
      <div className="search-input-container">
        <span className="search-input-description">
        <p>Results:</p>
        </span>
        <div className="w3-row w3-border">
          <div className="w3-col w3-small" style={wideCol}><b>Food/Beverage</b></div>
          <div className="w3-col w3-small" style={narrowCol}><b>Portion Size</b></div>
          <div className="w3-col w3-small" style={narrowCol}><b>Total Calories</b></div>
          <div className="w3-col w3-small" style={narrowCol}><b>Calories from Fat</b></div>
        </div>
        {searchResults}
      </div>
    );
  }
  else if (submitted == true) {
    return (
      <div>
        <div>No search results</div>
      </div>
    );
  }
  return(
    <div></div>
  );
};

export default SearchResults;
