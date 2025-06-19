// URL for the JSON data containing cities and states information
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// Array to store all cities and states data after fetching
let cities = [];

// Fetch the cities data and store it in our cities array
fetch(endpoint)
  .then(blob => blob.json())  // Convert the raw data to JSON
  .then(data => cities.push(...data))  // Spread the array into our cities array

// Function to find matching cities and states based on user input
const findMatches = (wordToMatch, cities) => {
    return cities.filter(place => {
        // Create a regular expression for case-insensitive matching
        const regex = new RegExp(wordToMatch, 'gi');
        // Return true if the word matches either city or state name
        return place.city.match(regex) || place.state.match(regex)
    });
}

// Function to display matching results as the user types
function displayMatches(e) {
    // Find all matches using the input value
    const matchArray = findMatches(e.currentTarget.value, cities);
    // Generate HTML for each matching place
    const html = matchArray.map(place => {
      // Create regex for highlighting matched text
      const regex = new RegExp(e.currentTarget.value, 'gi');
      // Replace matched text with highlighted span
      const cityName = place.city.replace(regex, `<span class="hl">${e.currentTarget.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${e.currentTarget.value}</span>`);
      // Return HTML template for each match
      return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(place.population)}</span>
        </li>
      `;
    }).join('');
    // Insert the generated HTML into the suggestions list
    suggestions.innerHTML = html;
}

// Select the search input and suggestions elements from the DOM
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// Add event listener for real-time input changes
searchInput.addEventListener('input', displayMatches);

// Helper function to format numbers with commas (e.g., 1,234,567)
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}