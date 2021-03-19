import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  it('should render two <NavigationItem /> elements', () => {
    const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
    expect(
      wrapper.contains(
        <NavigationItem link="/gantt-charts" exact>
          Gantt Charts
        </NavigationItem>
      )
    ).toEqual(true);
    expect(
      wrapper.contains(
        <NavigationItem link="/gantt-charts/demo-new-chart">Demo New Chart</NavigationItem>
      )
    ).toEqual(true);
  });
});
