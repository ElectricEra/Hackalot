import { combineReducers } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import loginReducer from './loginReducer';
import userData from './userData';

const App = combineReducers({
    firebase: firebaseReducer,
    loginReducer,
    userData
})

export default App
