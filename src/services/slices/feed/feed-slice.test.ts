import feedReducer, { getFeeds } from './feed-slice';
import { IFeedState, initialState } from './feed-slice';

describe('feedSlice', () => {
  it('should set isLoading to true when getFeeds is pending', () => {
    const state: IFeedState = {
      ...initialState,
      isLoading: false
    };
    const action = { type: getFeeds.pending.type };
    const newState = feedReducer(state, action);
    expect(newState.isLoading).toBe(true);
  });
  it('should set isLoading to false when getFeeds is fulfilled', () => {
    const orders = [
      {
        _id: '1',
        name: 'Burger',
        status: 'pending',
        createdAt: '2022-01-01T00:00:00.000Z',
        updatedAt: '2022-01-01T00:00:00.000Z',
        number: 1,
        ingredients: ['2', '3']
      }
    ];
    const total = 1;
    const totalToday = 1;
    const feedResponse = { success: true, orders, total, totalToday };
    const expectedState: IFeedState = {
      orders,
      total,
      totalToday,
      isLoading: false,
      error: null
    };
    const actualState = feedReducer(
      {
        ...initialState,
        isLoading: true
      },
      getFeeds.fulfilled(feedResponse, '', undefined)
    );
    expect(actualState).toEqual(expectedState);
  });
  it('should set error when getFeeds is rejected', () => {
    const error = new Error('Test error');
    const expectedState: IFeedState = {
      ...initialState,
      isLoading: false,
      error: error.message
    };
    const actualState = feedReducer(
      { ...initialState, isLoading: true },
      getFeeds.rejected(error, '')
    );
	expect(actualState).toEqual(expectedState);
  });
});
