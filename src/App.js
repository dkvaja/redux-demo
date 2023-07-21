import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import store from "./redux/store";
import Router from "./routes";
import { UserProvider } from "./contexts/UserContext";

const App = () => (
  <Provider store={store}>
    <UserProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </UserProvider>
  </Provider>
);

export default App;
