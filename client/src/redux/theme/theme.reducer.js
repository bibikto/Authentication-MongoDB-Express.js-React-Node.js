import { createMuiTheme } from '@material-ui/core/styles'

if (!localStorage.getItem("themeType"))
  localStorage.setItem("themeType", "dark");

const backgroundColor = {
  "light" : "white",
  "dark" : "#18191A"
}
  
const themeType = localStorage.getItem("themeType");

const INITIAL_STATE = {
  theme: createMuiTheme({
  palette: {
    type: themeType,
    background: {
      default: backgroundColor[themeType],
    }
  }
})
}



const reducer = (state = INITIAL_STATE, action="SWITCH") => {
  switch (action.type) {
    case 'SWITCH': {
      let type = state.theme.palette.type === 'light' ? 'dark' : 'light'
      localStorage.setItem("themeType", type);
      
      return {
        ...state, theme: createMuiTheme({
          palette: {
            type: type,
            background: {
              default: backgroundColor[type],
            }
          },
          
        }),
      };
    }
    default: {
      return state
    }
  }
};

export default reducer;