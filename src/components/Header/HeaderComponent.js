import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import firebase from 'firebase/app';

class HeaderComponent extends React.Component {
    render() {
        return (
            <nav>
              <div className="nav-wrapper light-blue">
                <Link to="/" className="brand-logo hl-link left">Hackalot</Link>
                <ul id="nav-mobile" className="right">
                    {!this.props.auth.isEmpty ?
                        <li><Link to="/create" className="hl-link">Create a hackathon</Link></li> 
                        : null
                    }
                    <li><Link to="/profile"className="hl-link">Profile</Link></li>
                </ul>
              </div>
            </nav>
        );
    }
}

export default compose(
    firebaseConnect([
        'todos'
    ]),
    connect((state) => ({
        auth: state.firebase.auth,
        todos: state.firebase.data.todos
    }))
  )(HeaderComponent);