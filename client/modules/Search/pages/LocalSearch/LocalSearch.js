import React, { Component } from 'react';
import { connect } from 'react-redux'
import TravelCreateWidget from '../../../Travel/components/TravelCreateWidget/TravelCreateWidget';

class LocalSearch extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <TravelCreateWidget showAddTravel={this.props.showAddTravel} />

        <h1>SOY EL LOCAL!!!</h1>
      </div>
    );
  }

}

function mapStateToProps({ app }) {
  return {
    showAddTravel: app.showAddTravel,
  }
}

export default connect(mapStateToProps)(LocalSearch);
