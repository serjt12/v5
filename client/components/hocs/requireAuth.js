import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Loading from 'react-loading-components';

export default (ChildComponent) => {
  class RequireAuth extends PureComponent {
    render() {
      switch (this.props.currentUser) {
        case false:
          return (<div>Por favor <Link to="/">registrate</Link> para continuar!!</div>);
        case null:
          return (<Loading type="oval" width={200} height={200} fill="#00BFB5" />);
        default:
          return <ChildComponent {...this.props} />;
      }
    }
  }

  function mapStateToProps({ auth: { currentUser } }) {
    return { currentUser };
  }

  RequireAuth.propTypes = {
    auth: PropTypes.bool,
  };

  return connect(mapStateToProps)(RequireAuth)
};
