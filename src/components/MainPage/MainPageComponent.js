import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HackathonListComponent from '../HackathonList/HackathonListComponent';

class MainPage extends React.Component {
    render() {
        return (
            <div className="container hl-main-section">
                <HackathonListComponent />
            </div>
        );
    }
}

function mapStateToProps({ loginReducer }) {
    return { loginReducer }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);