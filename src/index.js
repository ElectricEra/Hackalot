import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import reducers from './reducers';
import './styles/index.scss'

import MainPage from './components/MainPage/MainPageComponent.js';
import Header from './components/Header/HeaderComponent.js';
import HackathonFullInfo from './components/HackatonFullInfo.js';
import Profile from './components/Profile/ProfileComponent.js';
import Create from './components/CreateHackathon/CreateHackathonComponent.js'

const firebaseConfig = {
  apiKey: "AIzaSyBOTgDzahgjP1Bo86tS-LfUrQJxoNR3PHE",
  authDomain: "hackalot-2aba2.firebaseapp.com",
  databaseURL: "https://hackalot-2aba2.firebaseio.com",
  projectId: "hackalot-2aba2",
  storageBucket: "hackalot-2aba2.appspot.com",
  messagingSenderId: "743435890246"
};

const rrfConfig = {
  userProfile: 'users',
}

firebase.initializeApp(firebaseConfig);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
)(createStore)

const initialState = {}

const store = createStoreWithFirebase(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(thunk)
  )
)

export default class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false
    }
    this.loadLoadingView = this.loadLoadingView.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({mounted: true})
    }, 3000)
  }

  loadLoadingView() {
    if(this.state.mounted) {
      return null
    } else {
      return <div className="hl-background valign-wrapper"><p className="hl-background-text">Hackalot</p></div>
    }
  }

	render() {
		return (
      <Provider store={store}>
        <Router>
          <div>
            {this.loadLoadingView()}
            <Header />
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/create" component={Create}/>
            <Route path="/hackathons/:hackId" component={HackathonFullInfo}/>
          </div>
        </Router>
      </Provider>
    )
	}
}

ReactDOM.render(<MainApp />, document.getElementById('app'));
