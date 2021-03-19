import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TextareaAutosize } from '@material-ui/core';

import { DemoNewChart } from './DemoNewChart';

configure({ adapter: new Adapter() });

describe('<DemoNewChart />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DemoNewChart />);
  });

  it('should have button as disabled if JSON structure is invalid', () => {
    // JSON structure is missing some commas and speech marks.

    wrapper
      .find(TextareaAutosize)
      .at(0)
      .simulate('change', {
        target: {
          value: `[
            { id: "1", "label": "Foo" }
            { "id": "2", "label: "Bar" }
            { "id": "3", "label": "Baz" },
            { "id": 4, 'label': "Qux" }
          ]`
        }
      });
    wrapper
      .find(TextareaAutosize)
      .at(1)
      .simulate('change', {
        target: {
          value: `[
            {
              "id": 1,
              "resourceId": 1,
              "label": "Scheduled Shift",
              "from": "2021-02-18T01:00:00.000Z",
              "to": "2021-02-18T04:00:00.000Z",
              classes: "green"
            }
            {
              "id": 2,
              "resourceId": 2,
              "label": "Absence",
              "from": "2021-02-18T02:00:00.000Z",
              "to": "2021-02-18T07:00:00.000Z",
              classes: "orange"
            }
          ]`
        }
      });
    const buttonProps = wrapper.find('button').props();
    expect(buttonProps.disabled).toEqual(true);
  });

  it('should have button as enabled if JSON structure is valid', () => {
    wrapper
      .find(TextareaAutosize)
      .at(0)
      .simulate('change', {
        target: {
          value: `[
            { "id": "1", "label": "Foo" },
            { "id": "2", "label": "Bar" },
            { "id": "3", "label": "Baz" },
            { "id": "4", "label": "Qux" }
          ]`
        }
      });
    wrapper
      .find(TextareaAutosize)
      .at(1)
      .simulate('change', {
        target: {
          value: `[
            {
              "id": "1",
              "resourceId": "1",
              "label": "Scheduled Shift",
              "from": "2021-02-18T01:00:00.000Z",
              "to": "2021-02-18T04:00:00.000Z",
              "classes": "green"
            },
            {
              "id": "2",
              "resourceId": "2",
              "label": "Absence",
              "from": "2021-02-18T02:00:00.000Z",
              "to": "2021-02-18T07:00:00.000Z",
              "classes": "orange"
            }
          ]`
        }
      });
    const buttonProps = wrapper.find('button').props();
    expect(buttonProps.disabled).toEqual(false);
  });
});
