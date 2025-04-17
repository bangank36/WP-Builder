// Only import wdyr in development mode
if (process.env.NODE_ENV !== 'production') {
  // import('./wdyr');
}

//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

// include @wordpress/components styles
import '@wordpress/components/build-style/style.css';

//import your own components
import Home from "./component/form.jsx";

// Initialize the application
const initialize = (elementId = 'app') => {
  const targetElement = document.getElementById(elementId);
  if (targetElement) {
    ReactDOM.render(<Home />, targetElement);
  } else {
    console.error(`Target element with ID '${elementId}' not found.`);
  }
};

// Auto-initialize if the app element exists
if (document.getElementById('app')) {
  initialize();
}

// Export the component and initialization function
export { Home };
export default {
  initialize,
  Home
};
