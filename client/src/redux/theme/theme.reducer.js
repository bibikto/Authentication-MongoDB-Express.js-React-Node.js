
import { createMuiTheme } from '@material-ui/core/styles'


const INITIAL_STATE = {
  theme: createMuiTheme({
    palette: {
      type: 'light'
    },
  })
};



const reducer = (state = INITIAL_STATE, action="SWITCH") => {
  switch (action.type) {
    case 'SWITCH': {
      let type = state.theme.palette.type === 'light' ? 'dark' : 'light'
      if (type == 'light') {
        document.querySelector('html').classList.remove('htmldark')
        document.querySelector('html').classList.add('htmllight')
      }
      else {
        document.querySelector('html').classList.remove('htmllight')
        document.querySelector('html').classList.add('htmldark')
      }
      return {
        ...state, theme: createMuiTheme({
          palette: {
            type: type
          }
        }),
      };
    }
    default: {
      document.querySelector('html').classList.add('htmllight')
      return state
    }

  }





};

export default reducer;