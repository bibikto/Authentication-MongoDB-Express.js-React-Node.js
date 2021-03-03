
import { createMuiTheme } from '@material-ui/core/styles'


const INITIAL_STATE = {
  theme: createMuiTheme({
    palette: {
      type: 'dark'
    },
  })
};



const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SWITCH': {
      let type = state.theme.palette.type === 'light' ? 'dark' : 'light'
      if (document.querySelector('html').classList.contains('htmldark')) {
        document.querySelector('html').classList.remove('htmldark')
        document.querySelector('html').classList.add('htmllight')
      }
      else {
        document.querySelector('html').classList.add('htmllight')
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
      document.querySelector('html').classList.add('htmldark')
      return state
    }

  }





};

export default reducer;