import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/Routing/Routes';
import Navbar from './components/Layout/Navbar/Navbar';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './store/actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
