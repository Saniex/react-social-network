import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import styled, { ThemeProvider } from 'styled-components';

import { 
  getAppInit,
  selectAppErrorMessage,
  selectAppErrorStatus,
  selectAppInitStatus, 
  selectAppTheme
} from './store/appSlice';

import Preloader from './components/Preloader';
import ErrorPage from './pages/error/ErrorPage';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import LoginPage from './pages/login/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';
import SearchPage from './pages/search/SearchPage';

import { lightTheme, darkTheme } from './utils/appThemes';
import GlobalStyle from './utils/globalStyle';



const MainWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 90px 50px 25px 50px;
  margin: 0 0 0 300px;

  ${({theme}) => theme.breakpoints.touch} {
    padding: 80px 15px 15px 15px;
    margin: 0;
  }
`;



const pickTheme = theme => {
  switch (theme) {
    case 'light': return lightTheme;
    case 'dark': return darkTheme;
    default: return lightTheme
  }
}



const App = props => {

  const dispatch = useDispatch();

  const AppTheme = useSelector(selectAppTheme);
  const isAppInit = useSelector(selectAppInitStatus);
  const isAppError = useSelector(selectAppErrorStatus);
  const appErrorMessage = useSelector(selectAppErrorMessage);



  useEffect(() => {
    if (!isAppInit) dispatch(getAppInit());
  }, [isAppInit])



  if (isAppError) return (
    <ThemeProvider theme={pickTheme(AppTheme)}>
      <GlobalStyle />
      <ErrorPage message={appErrorMessage} />
    </ThemeProvider>
  )

  if (!isAppInit) return (
    <ThemeProvider theme={pickTheme(AppTheme)}>
      <GlobalStyle />
      <Preloader main />
    </ThemeProvider>
  )

  return (
    <ThemeProvider theme={pickTheme(AppTheme)}>
      <GlobalStyle />
      <MainWrapper>
        <Header />
        <Sidebar />
        <PageWrapper>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/profile/:userID?" component={ProfilePage} />
            <Route path="/search" component={SearchPage} />
            <Redirect to="/profile" />
          </Switch>
        </PageWrapper>
      </MainWrapper>
    </ThemeProvider>
  );
}



export default App;
