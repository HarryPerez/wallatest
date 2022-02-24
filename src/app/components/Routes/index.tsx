import React from 'react';
import { Route, Router } from 'react-router-dom';
import Home from 'app/screens/Home';
import { ROUTES } from 'constants/routes';
import { createBrowserHistory } from 'history';

import styles from './styles.module.scss';

export const history = createBrowserHistory();

const AppRoutesContainer = () => (
  <Router history={history}>
    <div className={`full-width column center ${styles.container}`}>
      <Route component={Home} exact path={ROUTES.HOME.path} />
    </div>
  </Router>
);

export default AppRoutesContainer;
