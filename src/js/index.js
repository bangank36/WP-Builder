import './wdyr'; // <--- first import

//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

// include @wordpress/components styles
import '@wordpress/components/build-style/style.css';

//import your own components
import Home from "./component/form.jsx";

//render your react application
ReactDOM.render(<Home />, document.querySelector("#app"));
