import React from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import Money from './views/Money';
import Labels from './views/Labels';
import Statistics from './views/Statistics';
import NoMatch from './views/NoMatch';
import EditLabel from './views/EditLabel';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/money">
          <Money />
        </Route>
        <Route exact path="/labels">
          <Labels />
        </Route>
        <Route exact path="/labels/:id">
          <EditLabel />
        </Route>
        <Route exact path="/statistics">
          <Statistics />
        </Route>
        <Redirect exact from="/" to="/money">
          <Money />
        </Redirect>
        <Route path="*">
          <NoMatch/>
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
