import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import SvelteGanttReact from './containers/SvelteGanttReact/SvelteGanttReact';
import GanttChartTypes from './containers/GanttChartTypes/GanttChartTypes';
import DemoNewChart from './containers/DemoNewChart/DemoNewChart';

const App = props => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/gantt-charts/demo-new-chart" component={DemoNewChart} />
          <Route path="/gantt-charts/:chartType" component={SvelteGanttReact} />
          <Route path="/gantt-charts" exact component={GanttChartTypes} />
          <Redirect to="/gantt-charts" />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
