import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase/app';
import { compose } from 'redux';
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import Input from '../CommonInputComponents/InputComponent.js';
import DatePicker from '../CommonInputComponents/DatePickerComponent.js';
import Tags from '../CommonInputComponents/TagsComponent.js';
import Dropdown from '../CommonInputComponents/DropdownComponent';

let filee;
let tooltipText;

class CreateHackathonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTooltip: false
        }
        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler() {
        let name = $('#name').val();
        let description = $('#desc').val();
        let website = $('#website').val();
        let maxParticipants = +$('#maxParticipants').val();
        let requirements = $('#requirements').val();
        let a = new Date($('#date-start').val())
        let b = new Date($('#date-end').val())
        
        let filee = $('#filee').val().replace('fakepath', 'Users\\Yuriy\\Desktop\\')
        console.log(filee)
        let switcher = true;
        let dates = [];
        let place = $('#takePlace').val();
        let tags = [
            $('#filled-in-box0').prop('checked') ? 'AR' : undefined,
            $('#filled-in-box1').prop('checked') ? 'VR' : undefined,
            $('#filled-in-box2').prop('checked') ? 'WEB' : undefined,
            $('#filled-in-box3').prop('checked') ? 'GAMEDEV' : undefined,
            $('#filled-in-box4').prop('checked') ? 'IOT' : undefined
        ].filter(a=>!!a)
        if (place == 0) { 
            place = 'online' 
        } else if (+place == 1) { 
            place = 'offline' 
        }
        if (a == 'Invalid Date' || b == 'Invalid Date') {
            switcher = false;
        } else {
            dates = [a.toISOString(), b.toISOString()]
        }
        if (name == '' || desc == '') {
            switcher = false;
        }
        let data = {
            name,
            description,
            dateStart: dates[0],
            endDate: dates[1],
            location: place,
            tags,
            picture: 'https://res.cloudinary.com/ideation/image/upload/iumou3qxs3og6dgjr8ov',
            creator: this.props.auth.displayName,
            website,
            maxParticipants,
            requirements,
            id: `${name.split(" ").join("-").toLowerCase()}-${Object.keys(this.props.todos).length}`,
            picture: filee
        };
        if (switcher) {
            firebase.database().ref('/todos').push(data);
            tooltipText = 'Hackathon added';
            this.setState({showTooltip: true});
            setTimeout(()=>{this.setState({showTooltip: false})}, 2000)
        } else {
            tooltipText = 'Error. Something is wrong.';
            this.setState({showTooltip: true});
            setTimeout(()=>{this.setState({showTooltip: false})}, 2000)
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col s2 l3"></div>
                <div className="col s8 l6 hl-create-hackathon-wrapper center-align">
                    {this.state.showTooltip ? (<div className="tooltip center-align">{tooltipText}</div>) : null}
                    <h3 className='center-align'>Let's create a hackathon. Fill some information</h3>
                    <br />
                    <div className="hl-create-hackathon-edit-fields">
                        <Input id="name" type="text" labelText="Name" />
                        <Input id="desc" type="text" labelText="Description" />
                        <Tags activitiesList={["AR", "VR", "WEB", "GAMEDEV", "IOT"]}/>
                        <Dropdown title="Where will it take place?" id="takePlace" optionList={['online', 'offline']} classList="input-field col s12" />
                        <DatePicker id="date-start" title="Start date"/>
                        <DatePicker id="date-end" title="End date"/>
                        <Input id="website" type="text" labelText="Website URL" optional />
                        <Input id="maxParticipants" type="text" labelText="Max participants" optional />
                        <Input id="requirements" type="text" labelText="Requirements" optional />
                        <Input id="filee" type="text" labelText="Image URL" optional />
                    </div>
                    <button className="waves-effect waves-light btn" onClick={this.submitHandler}>Register</button>
                </div>
                <div className="col s2 l3"></div>
            </div>
        );
    }
}

export default compose(
    firebaseConnect([
        'todos',
        'uploadedFiles'
    ]),
    connect((state) => ({
        auth: state.firebase.auth,
        users: state.firebase.data.users,
        todos: state.firebase.data.todos,
        uploadedFiles: state.firebase.data.uploadedFiles
    }))
  )(CreateHackathonComponent);