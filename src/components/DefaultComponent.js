import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ABC extends React.Component {
    render() {
        return (
            <div>
                Good morning!
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

export default connect(mapStateToProps, mapDispatchToProps)(ABC);