import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from "react-router-dom";

import HackathonDateComponent from './HackathonDateComponent';

class HackathonItemComponent extends React.Component {
    render() {
        return (
            <div className="hl-hli-wrapper row">
                <div className="hl-hli-image-wrapper col s5 m4">
                    <img src={this.props.data.picture} className="responsive-img"/>
                </div>
                <div className="hl-hli-text-wrapper col s7 m8">
                    <div className="hl-hli-text-description-wrapper"><span>Name:</span><span className="hl-hli-text-title-wrapper">{this.props.data.name}</span></div>
                    <HackathonDateComponent 
                        text="Event start date"
                        date={this.props.data.dateStart}
                    />
                    <HackathonDateComponent 
                        text="End of registration"
                        date={this.props.data.endDate}
                    />
                    <p className="hl-hli-text-description-wrapper truncate">{this.props.data.description}</p>
                    <Link to={`/hackathons/${this.props.uniqueId}`} className="hl-hli-text-details-wrapper hl-details-link">See more details...</Link>
                </div>
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

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(HackathonItemComponent);