import { combineReducers } from 'redux';


import theme from './theme/theme.reducer';
import auth from './auth/auth';
import message from './auth/message'

const rootReducer = combineReducers({
    theme,
    auth,
    message
});

export default rootReducer;