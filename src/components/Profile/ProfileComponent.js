import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import firebase from 'firebase/app';

import { addUserData } from '../../actions/index';

class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        };
        this.loggedInUser = this.loggedInUser.bind(this);
        this.guest = this.guest.bind(this);
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.setState({isLogged: true});
            } else {
                this.setState({isLogged: false});
            }
            this.props.addUserData(user);
        }.bind(this), function(error) {
        });
        
    }

    signIn() {
        var provider = new firebase.auth.GoogleAuthProvider();
    
        firebase.auth().signInWithRedirect(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
        });
    }
    
    signOut() {
        firebase.auth().signOut();
    }

    loggedInUser() {
        let user = this.props.users ? 
            this.props.users[this.props.auth.uid] ? 
                this.props.users[this.props.auth.uid].hackathonsParticipated ?
                    Object.values(this.props.users[this.props.auth.uid].hackathonsParticipated) 
                    : []
                : [] 
            : [];
        console.log(this.props.users && this.props.users[this.props.auth.uid])
        return (
            <div>
                <img className="circle" src={this.props.firebase.profile.avatarUrl} />
                <p className="hl-profile-bio">{this.props.firebase.profile.displayName}</p>
                <p className="hl-profile-bio">{this.props.firebase.profile.email}</p>
                <p className="hl-profile-bio">Hackathons participated : {user.length}</p>
            </div>
        )
    }

    guest() {
        return (
            <div> 
                <img className="circle" src='https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg' />
                <p className="hl-profile-bio">Guest</p>
                <p className="hl-profile-bio">If you want to register for a hackathon or track your personal achievements - please log in</p>
            </div>
        )
    }

    render() {
        return (
            <div className="center-align row">
                <div className="col m2" />
                <div className="col m8 hl-profile-wrapper ">
                    <div>
                        {this.state.isLogged ? 
                            this.loggedInUser() : 
                            this.guest()
                        }
                    </div>
                    <div className="breaker" />
                    <div>
                        {!this.state.isLogged ? 
                            <button onClick={this.signIn} className="waves-effect waves-light btn">Log In</button> : 
                            <button onClick={this.signOut} className="waves-effect waves-light btn">Log Out</button>
                        }
                    </div>
                </div>
                <div className="col m2" />              
            </div>
        )
    }
    
}

function mapStateToProps({ userData, firebase }) {
    return { userData, firebase, auth: firebase.auth, users: firebase.data.users }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addUserData }, dispatch)
}

export default compose(
    firebaseConnect([
        'users'
    ]),
    connect(mapStateToProps, mapDispatchToProps)
  )(ProfileComponent)