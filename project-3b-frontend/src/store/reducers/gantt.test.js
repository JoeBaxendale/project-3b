import reducer from './gantt';
import * as actionTypes from '../actions/actionTypes';

describe('gantt reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      rows: [],
      tasks: [],
      error: null,
      loading: false
    });
  });

  it('should store the rows and tasks upon fetch', () => {
    expect(
      reducer(
        {
          rows: [],
          tasks: [],
          error: null,
          loading: false
        },
        {
          type: actionTypes.FETCH_DATA_SUCCESS,
          rows: [{ id: '1', label: 'Foo' }],
          tasks: [
            {
              id: '1',
              resourceId: '1',
              label: 'Scheduled Shift',
              from: '2021-02-18T01:00:00.000Z',
              to: '2021-02-18T04:00:00.000Z',
              classes: 'green'
            }
          ]
        }
      )
    ).toEqual({
      rows: [{ id: '1', label: 'Foo' }],
      tasks: [
        {
          id: '1',
          resourceId: '1',
          label: 'Scheduled Shift',
          from: '2021-02-18T01:00:00.000Z',
          to: '2021-02-18T04:00:00.000Z',
          classes: 'green'
        }
      ],
      error: null,
      loading: false
    });
  });
});
