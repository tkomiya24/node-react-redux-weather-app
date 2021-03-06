import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {addAndFetchForCityIfNecessary} from '../actions/weatherInfo';
import {select as selectCity} from '../actions/cities';

export class CityAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  render() {
    return (
      <div className="city-adder">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.city}
            placeholder="Add a city"
            onChange={this.onChange} />
        </form>
      </div>
    );
  }
  onChange(event) {
    this.setState({
      city: event.target.value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    if (!this.props.cities.includes(this.state.city.toUpperCase())) {
      this.props.addCity(this.state.city);
    }
    this.props.selectCity(this.state.city);
    this.setState({
      city: ''
    });
  }
};

CityAdder.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  addCity: PropTypes.func.isRequired,
  selectCity: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    cities: state.cities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCity: function(city) {
      dispatch(addAndFetchForCityIfNecessary(city));
    },
    selectCity: function(city) {
      dispatch(selectCity(city));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CityAdder);
