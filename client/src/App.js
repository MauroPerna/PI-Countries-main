import React from "react"
import { Route } from "react-router-dom";
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import CountryDetails from './components/country_detail/CountryDetail'

function App() {
	return (
		<React.Fragment>
			<Route exact path="/" component={Landing}/>
			<Route path="/home" component={Home}/>
			<Route path="/countryDetail" component={CountryDetails}/>
		</React.Fragment>
	);
}

export default App;
