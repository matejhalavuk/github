import React, { Component } from 'react';
import { connect } from 'react-redux';

import Const from '../../const';

class SettingsComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			hooverCategory: '',
			selectedCategory: 'POSTAVKE PROFILA',
			categoryInfo: 'PROMIJENITE PODATKE VEZANE UZ VAŠ PROFIL',
		};

		this.renderCategories = this.renderCategories.bind(this);
		this.onMouseOverCategory = this.onMouseOverCategory.bind(this);
		this.onMouseOutCategory = this.onMouseOutCategory.bind(this);
		this.onSelectCategory = this.onSelectCategory.bind(this);
		this.renderCategoriesInfo = this.renderCategoriesInfo.bind(this);
	}

	componentDidMount() {
		const { user } = this.props;
		// if user is not logged in, redirect to log in page
		if(Object.getOwnPropertyNames(user).length === 0)
			this.props.history.push("/prijava");
	}

	onMouseOverCategory(element, label) {
		this.setState({ hooverCategory: label });
	}

	onMouseOutCategory() {
		this.setState({ hooverCategory: '' });
	}

	onSelectCategory(element, label, categoryInfo) {
		if(label === this.state.selectedCategory) {
			this.setState({ selectedCategory: '' });
			this.setState({ categoryInfo: '' });
		} else {
			this.setState({ selectedCategory: label });
			this.setState({ categoryInfo });
		}
	}

	renderCategoriesInfo() {
		const { categoryInfo } = this.state;

		return (
			<div>
				<p className="text-center mb-0 mt-3">{categoryInfo}</p>
				<hr className="mt-0" />
			</div>
		);
	}

	renderCategories() {
		console.log(Const.settingsCategories);
		return(
			<div className="row mt-3">
				<div className="col-lg-4 col-sm-3 col-xs-2" />
	      {Const.settingsCategories.map((category, index) => {
	      	let opacityLevel = 1;
	      	if(category.label === this.state.hooverCategory) //if mouse hoovers the category, set opacity level to 0.5
	      		opacityLevel = 0.5;

	      	let backgroundColor = '#f1f2f2';
	      	if(category.label === this.state.selectedCategory) //if mose clicks the category, set background to light green
	      		backgroundColor = '#b5dbd2';

	      	return(
 						<div 
 							className="col-lg-2 col-sm-3 col-xs-4" 
 							onMouseOver={(elem) => this.onMouseOverCategory(elem, category.label)} 
 							onMouseOut={this.onMouseOutCategory}
 							onClick={(elem) => this.onSelectCategory(elem, category.label, category.categoryInfo)}
 							key={index}
 							style={{ backgroundColor }}
 						>
	        		<img src={category.url} style={{ opacity: opacityLevel }} className="img-fluid p-2" />
	        		<p className="text-center">{category.label}</p>
	        	</div>
	      	);
	      })}
	      <div className="col-lg-4 col-sm-3 col-xs-2" />
	    </div>
		);
	}

	render(){
		console.log(this.renderCategories());
		return(
			<div className="container px-5">
				{this.renderCategories()}
				{this.renderCategoriesInfo()}
			</div>
		);
	}
}

const stateToProps = (state) => {
	return {
		user: state.profiles.user,
	};
};

export default connect(stateToProps)(SettingsComponent);