import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SvelteGanttAddBar } from './SvelteGanttAddBar';

configure({ adapter: new Adapter() });

describe('<SvelteGanttAddBar />', () => {
  it('should have orange button as absence if path is for field engineer chart', () => {
    const location = { pathname: '/gantt-charts/FIELD_ENGINEER' };
    const wrapper = shallow(<SvelteGanttAddBar location={location} />);
    wrapper.setProps({ colour: 'orange' });
    expect(wrapper.find('button').text()).toEqual('Absence');
  });

  it('should have orange button as not available if path is for tennis court chart', () => {
    const location = { pathname: '/gantt-charts/TENNIS_COURT' };
    const wrapper = shallow(<SvelteGanttAddBar location={location} />);
    wrapper.setProps({ colour: 'orange' });
    expect(wrapper.find('button').text()).toEqual('Not Available');
  });
});
