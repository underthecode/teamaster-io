import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return 'still waiting';
      case false:
        return 'im logged out';
      default:
        return 'im logged in';
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">teamaster-io</a>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Header);
