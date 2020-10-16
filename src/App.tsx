import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { store } from './init/store';
import { Header } from './domains/Header';
import { Menu } from './domains/Menu';
import { Users } from './domains/Monitoring/Users';
import { Employees } from './domains/Monitoring/Employees';
import ErrorBoundary from './components/ErrorBoundary';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      display: 'flex',
      // toolbar: theme.mixins.toolbar as CSSProperties,
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...(theme.mixins.toolbar as CSSProperties),
    } as CSSProperties,

    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

function App(): JSX.Element {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <Header />
          <Menu />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <ErrorBoundary>
              <Switch>
                <Route path="/Employees">
                  <Employees />
                </Route>
                <Route path="/">
                  <Users />
                </Route>
              </Switch>
            </ErrorBoundary>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
