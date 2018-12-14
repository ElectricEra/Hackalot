import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import { withFirebase, firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import HackathonItemComponent from './HackathonItemComponent';

import DatePicker from '../CommonInputComponents/DatePickerComponent.js';

class HackathonListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'newest'
        }
        this.renderToolbar = this.renderToolbar.bind(this);
        this.renderList = this.renderList.bind(this);
    }

    renderToolbar(data) {
        return (
            <div>
                <p>Sort by</p>
                <select style={{display: "block"}} onChange={(e)=>{this.setState({value: e.target.value})}} value={this.state.value}>
                    <option value="newest">Newest</option>
                    <option value="mostpopular">Most popular</option>
                    <option value="enddate">End of registration</option>
                    <option value="startdate">Start of hackathon</option>
                </select>
            </div>
        )
    }

    renderList(renderData) {
        console.log(renderData)
        return Object.entries(renderData).sort((a, b) => {
                if (this.state.value === 'startdate') {
                    var d1 = new Date(a[1].dateStart);
                    var d2 = new Date(b[1].dateStart);
                    return d1.getTime() - d2.getTime();
                }
                if (this.state.value === 'enddate') {
                    var d1 = new Date(a[1].endDate);
                    var d2 = new Date(b[1].endDate);
                    return d1.getTime() - d2.getTime();
                }
                if (this.state.value === 'newest') {
                    return 1
                }
                if (this.state.value === 'mostpopular') {
                    let aPart = a[1].registeredParticipants ? a[1].registeredParticipants.length : 0;
                    let bPart = b[1].registeredParticipants ? b[1].registeredParticipants.length : 0;
                    return aPart - bPart                    
                }
            }).map(
            (key, id) => { 
                let data = renderData[key[0]];
                return <HackathonItemComponent
                    key={key} 
                    id={id}
                    data={renderData[key[0]]}
                    date={data.startDate}
                    title={data.name}
                    description={data.description}
                    tags={data.tags}
                    image={data.picture}
                    uniqueId={data.id || 0}
                />
            }
        );
    }

    render() {
        const todosList = !isLoaded(this.props.todos)
            ? 'Loading...'
            : isEmpty(this.props.todos)
                ? 'No hackathons...'
                : this.renderList(this.props.todos)
        return (
            <div className="1">
                <h2 className="center-align">List of all hackathons</h2>
                {this.renderToolbar()}
                {todosList === 'Loading...' ? (<div className="center-align">Loading...</div>) : todosList}
            </div>
        );
    }
}

function mapStateToProps({}) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default compose(
    firebaseConnect([
      'todos'
    ]),
    connect((state) => ({
      todos: state.firebase.data.todos
    }))
  )(HackathonListComponent)