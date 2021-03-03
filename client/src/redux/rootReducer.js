import { combineReducers } from 'redux';


import themeReducer from './Theme/theme.reducer';


const rootReducer = combineReducers({

    theme: themeReducer,

});

export default rootReducer;