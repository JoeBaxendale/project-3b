import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/gantt-charts" exact>
        Gantt Charts
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;