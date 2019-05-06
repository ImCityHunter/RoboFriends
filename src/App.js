import React , { Component }from 'react';
import CardList from './cardList';
import { robots } from './robots';
import SearchBox from './SearchBox';
import './App.css'
import Scroll from './Scroll';

class App extends Component {
	constructor(){
		super()

		//used to change the result shown on index.js
		this.state = { 
			robots: [],
			searchfield: ''
		}
	}
	componentDidMount(){
		//use online fake data to generate a list of users
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=>{ return response.json(); })
			.then(users =>{this.setState( { robots:users } )});
	}


	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render (){
		const filteredRobot = this.state.robots.filter(robots =>{

			//search if event.value is included in our data
			return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})

		if(this.state.robots.length ===0 ){
			return <h1> Loading </h1>
		}
		else{
			return (
				<div className = 'tc'>
					<h1 className='f1'> Robot Friends </h1>
					<SearchBox searchChange={ this.onSearchChange } />
					<Scroll>
						<CardList robots = { filteredRobot }/>
					</Scroll>

				</div>
			);
		}
	}


}

export default App;