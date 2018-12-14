import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'redux';
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import firebase from 'firebase/app';

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

class HackathonFullInfo extends React.Component {
    constructor(props) {
        super(props);
        
        this.renderHackathon = this.renderHackathon.bind(this);
    }
    
    renderHackathon([hack]) {
        let data = hack[1];
        let identifier = hack[0];
        let dates = {
            dateStart: new Date(data.dateStart),
            endDate: new Date(data.endDate)
        }

        let currentDate = new Date();
        let status;
        if (currentDate < dates.dateStart) {
            status = 'Registration time.'
        } else if (currentDate < dates.endDate) {
            status = 'Registration is closed.'
        } else {
            status = "You should've been at this hackathon..."
        }

        let signInToHack;
        if (this.props.auth.isEmpty){
            signInToHack = 'Sign in to register';
        } else if (data.registeredParticipants === undefined) {
            if (data.maxParticipants > 0) {
                signInToHack = (<button className="waves-effect waves-light btn" onClick={() => {  
                    firebase.database().ref(`/todos/${identifier}/registeredParticipants`).push({
                        uid: this.props.auth.uid,
                        email: this.props.auth.email,
                        displayName: this.props.auth.displayName
                    })
                    firebase.database().ref(`/users/${this.props.auth.uid}/hackathonsParticipated`).push({hackathon: identifier})
                }}>Register</button>)
            } else if (data.maxParticipants == false) {
                signInToHack = (<button className="waves-effect waves-light btn" onClick={() => {  
                    firebase.database().ref(`/todos/${identifier}/registeredParticipants`).push({
                        uid: this.props.auth.uid,
                        email: this.props.auth.email,
                        displayName: this.props.auth.displayName
                    })
                    firebase.database().ref(`/users/${this.props.auth.uid}/hackathonsParticipated`).push({hackathon: identifier})
                }}>Register</button>)
            } else {
                signInToHack = 'No more free spaces';
            }
        } else if (!Object.values(data.registeredParticipants).map(a => a.uid).includes(this.props.auth.uid)) {
            if (!data.maxParticipants || data.maxParticipants > Object.values(data.registeredParticipants).length) {
                signInToHack = (<button className="waves-effect waves-light btn" onClick={() => {  
                    firebase.database().ref(`/todos/${identifier}/registeredParticipants`).push({
                        uid: this.props.auth.uid,
                        email: this.props.auth.email,
                        displayName: this.props.auth.displayName
                    })
                    firebase.database().ref(`/users/${this.props.auth.uid}/hackathonsParticipated`).push({hackathon: identifier})
                }}>Register</button>)
            } else {
                signInToHack = 'No more free spaces';
            }
        } else {
            signInToHack = 'You are already registered';
        }

        return (
            <div className="row no-gutters">
                <div className="col m7">
                    <p className="bigger-text">Description</p>
                    
                    <p>{data.description}</p>
                    <div className="breaker" />
                    <div className="breaker" />
                    
                    <p className="bigger-text">Dates</p>
                    
                    <p className="big-text">Start date</p>
                    <p>{dates.dateStart.getDate()}&nbsp;{months[dates.dateStart.getMonth()]}</p>
                    <div className="breaker" />
                    
                    <p className="big-text">End of registration</p>
                    <p>{dates.endDate.getDate()}&nbsp;{months[dates.endDate.getMonth()]}</p>
                    <div className="breaker" />
                    <div className="breaker" />
                    
                    <p className="bigger-text">Location</p>
                    <p>{data.location}</p>
                    <div className="breaker" />

                    <p className="bigger-text">Participants</p>
                    {data.maxParticipants ?
                        data.registeredParticipants ? 
                            (<p>{Object.values(data.registeredParticipants).length} out of max {data.maxParticipants}</p>) :
                            (<p>0 out of max {data.maxParticipants}</p>) :
                        (<p>Unlimited</p>)
                    }
                    <div className="breaker" />

                    <p className="bigger-text">Requirements</p>
                    <p>{data.requirements}</p>

                </div>
                <div className="col m5">
                    <img src={data.picture} className="responsive-img"/>
                    <div className="center-align">{data.tags.map((a, id) => {
                        console.log(a);
                        return (<div key={id+"1"}className="hl-theme-tag">{a}</div>)
                    })}</div>
                    <p className="bigger-text">Creator</p>
                    <p>{data.creator}</p>
                    <div className="breaker" />
                    <p className="bigger-text">Hackathon status</p>
                    <p>{status}</p>
                    <div className="breaker" />
                    <p className="bigger-text">Website</p>
                    {data.website ? (<a href={`https://${data.website}`} target="_blank">{data.website}</a>) : "No website"}
                    <div className="breaker" />
                    {signInToHack}
                </div>
            </div>
        )
    }

    render() {
        const todosList = !isLoaded(this.props.todos)
            ? 'Loading'
            : isEmpty(this.props.todos)
                ? 'Todo list is empty'
                : this.renderHackathon(Object.entries(this.props.todos).filter(a => {
                    return a[1].id == this.props.match.params.hackId
                }));
        return (
            <div className="row hl-full-info">
                <div className="col m2" />
                <div className="col m8">
                    {todosList}
                </div>
                <div className="col m2" />
            </div>
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
  )(HackathonFullInfo);