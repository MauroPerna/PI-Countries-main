import React from "react"
import { Route } from "react-router-dom";
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import CountryDetails from './components/country_detail/CountryDetail';
import CreateActivity from './components/create_activities/CreateActivities';
import Nav from "./components/nav/Nav";
import ModifiedActivity from './components/modified_activity/ModifiedActivity';
import ActivityDetail from './components/activity_detail/ActivityDetail';

// ok

function App() {
	return (
		<React.Fragment>
			<Route exact path="/" component={Landing}/>
			<Route path={["/home", "/countryDetail/:id", "/createActivity", "/modified", "/activityDetail/:id"]} component={Nav}/>
			<Route path="/home" component={Home}/>
			<Route path="/countryDetail/:id" component={CountryDetails}/>
			<Route path="/createActivity" component={CreateActivity}/>
			<Route path="/modified" component={ModifiedActivity}/>
			<Route path="/activityDetail/:id" component={ActivityDetail}/>
		</React.Fragment>
	);
}

export default App;
