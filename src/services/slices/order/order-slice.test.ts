import { TOrder } from '../../../utils/types';
import { IOrderState, initialState } from './order-slice';
import orderReducer, {
  getOrder,
  createOrder,
  getOrders,
  resetOrder
} from './order-slice';

describe('orderSlice', () => {
  it('should set orderRequest to true when createOrder is pending', () => {
    const state: IOrderState = {
      ...initialState,
      orderRequest: false
    };
    const action = { type: createOrder.pending.type };
    const newState = orderReducer(state, action);
    expect(newState.orderRequest).toBe(true);
  });
  it('should set isLoading to false when createOrder is fulfilled and set orderModalData', () => {
    const orderData: TOrder = {
      _id: '123',
      name: 'Test Order',
      ingredients: ['123', '456'],
      status: 'done',
      number: 1,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z'
    };
    const action = createOrder.fulfilled(
      { order: orderData, success: true },
      '',
      ['123', '456']
    );
    const newState = orderReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.orderModalData).toEqual(orderData);
  });
  it('should set isLoading to true when getOrder is pending', () => {
    const state: IOrderState = {
      ...initialState,
      isOrderLoading: false
    };
    const action = { type: getOrder.pending.type };
    const newState = orderReducer(state, action);
    expect(newState.isOrderLoading).toBe(true);
  });
  it('should set isLoading to false when getOrder is fulfilled', () => {
    const action = { type: getOrder.fulfilled.type };
    const newState = orderReducer(initialState, action);
    expect(newState.isOrderLoading).toBe(false);
  });
  it('should set isLoading to true when getOrders is pending', () => {
    const state: IOrderState = {
      ...initialState,
      isLoading: false
    };
    const action = { type: getOrders.pending.type };
    const newState = orderReducer(state, action);
    expect(newState.isLoading).toBe(true);
  });
  it('should set isLoading to false when getOrders is fulfilled and set data', () => {
    const orders = [{ id: '123', name: 'Test Order' }];
    const action = { type: getOrders.fulfilled.type, payload: orders };
    const newState = orderReducer(initialState, action);
    expect(newState.data).toEqual(orders);
    expect(newState.isLoading).toBe(false);
  });
  it('should reset the state when resetOrder is called', () => {
    const state: IOrderState = {
      ...initialState,
      orderModalData: {
        _id: '123',
        name: 'Test Order',
        ingredients: ['123', '456'],
        status: 'done',
        number: 1,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z'
      }
    };
    const action = { type: resetOrder.type };
    const newState = orderReducer(state, action);
    expect(newState.orderModalData).toBe(null);
    expect(newState.error).toBe(null);
  });
});
