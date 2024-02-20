import { Provider } from "react-redux";
import GlobalStyle from "./GlobalStyle";
import Router from "./shared/Router";
import store from "./redux/config/store";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router />
    </Provider>
  );
}

export default App;
