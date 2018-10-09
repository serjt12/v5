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
          return (<div>Por favor registrate <Link to="/"> AQUI</Link> para continuar!!</div>);
        case null:
          return (<Loading type="oval" width={200} height={200} fill="rgb(42,168,154)" />);
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

  return connect(mapStateToProps)(RequireAuth);
};
