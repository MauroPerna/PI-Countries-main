import React from "react"
import { Route } from "react-router-dom";
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import CountryDetails from './components/country_detail/CountryDetail'
import CreateActivity from './components/create_activities/CreateActivities';
import Nav from "./components/nav/Nav";

function App() {
	return (
		<React.Fragment>
			<Route exact path="/" component={Landing}/>
			<Route path="/" component={Nav}/>
			<Route path="/home" component={Home}/>
			<Route path="/countryDetail/:id" component={CountryDetails}/>
			<Route path="/createActivity" component={CreateActivity}/>
		</React.Fragment>
	);
}

export default App;
