import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import SvelteGanttReact from './containers/SvelteGanttReact/SvelteGanttReact';

const App = props => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/gantt-charts" exact component={SvelteGanttReact} />
          <Redirect to="/gantt-charts" />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
