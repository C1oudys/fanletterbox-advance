import GlobalStyle from "./GlobalStyle";
import Router from "./shared/Router";
import { Provider } from 'react-redux';
import store from './redux/config/store';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;