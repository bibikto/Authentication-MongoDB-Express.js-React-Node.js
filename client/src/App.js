import { ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from "react-router-dom";
import { useSelector } from 'react-redux';

//Custom Component Import
import TopBar from './components/TopBar'
import AppRoutes from './routes';

export default function App() {
  const theme = useSelector(state => state.theme.theme)
  const user = useSelector(state => state.auth)

  return (
    <BrowserRouter >
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TopBar loggedIn={user.isLoggedIn} />
          <AppRoutes />
        </ThemeProvider >
      </StyledEngineProvider>
    </BrowserRouter>
  );
}



// window.addEventListener('beforeunload', (e) => {
//   SessionService.destroy()
// });
