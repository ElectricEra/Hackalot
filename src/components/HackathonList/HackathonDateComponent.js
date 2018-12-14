import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

class HackathonDateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(this.props.date)
        }
    }
    render() {
        // console.log(this.state)
        return (
            <div className="hl-hld-wrapper hl-hli-text-description-wrapper">
                <span className="hl-hld-text">
                    {this.props.text}: 
                </span>
                <span className="hl-hli-text-title-wrapper">
                    {this.state.date.getDate()}&nbsp;{months[this.state.date.getMonth()]}
                </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(HackathonDateComponent);