import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { lightTheme, darkTheme } from './utils/appThemes';
import GlobalStyle from './utils/globalStyle';



const MainWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
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
      </MainWrapper>
    </ThemeProvider>
  );
}



export default App;
