import { IUserState, initialState } from './user-slice';
import { TUser } from '../../../utils/types';
import userReducer, {
  getUser,
  updateUser,
  login,
  logout,
  register
} from './user-slice';

describe('userSlice', () => {
  it('should set isLoading to true when getUser is pending', () => {
    const state: IUserState = {
      ...initialState,
      isLoading: false
    };
    const action = { type: getUser.pending.type };
    const newState = userReducer(state, action);
    expect(newState.isLoading).toBe(true);
  });
  it('should set isLoading to false when getUser is fulfilled and set user', () => {
    const user = {
      name: 'Adam Smith',
      email: 'adamSmith@example.com',
      success: true
    };
    const action = getUser.fulfilled({ user, success: true }, '');
    const newState = userReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.user).toEqual(user);
  });
  it('should set isLoading to true when updateUser is pending', () => {
    const state: IUserState = {
      ...initialState,
      isLoading: false
    };
    const action = { type: updateUser.pending.type };
    const newState = userReducer(state, action);
    expect(newState.isLoading).toBe(true);
  });
  it('should set isLoading to false when updateUser is fulfilled and set user', () => {
    const user = {
      name: 'Adam Smith',
      email: 'adamSmith@example.com'
    };
    const action = updateUser.fulfilled({ user, success: true }, '', user); // добавлено поле success
    const newState = userReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.user).toEqual(user);
  });
  it('should set isLoading to true when login is pending', () => {
    const state: IUserState = {
      ...initialState,
      isLoading: false
    };
    const action = { type: login.pending.type };
    const newState = userReducer(state, action);
    expect(newState.isLoading).toBe(true);
  });
  it('should set isLoading to false when login is fulfilled and set user', () => {
    const user = {
      name: 'Adam Smith',
      email: 'adamSmith@example.com',
      password: 'password'
    };
    const action = login.fulfilled(user, '', user);
    const newState = userReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.user).toEqual(user);
  });
  it('should set isLoading to true when logout is pending', () => {
    const state: IUserState = {
      ...initialState,
      isLoading: false
    };
    const action = { type: logout.pending.type };
    const newState = userReducer(state, action);
    expect(newState.isLoading).toBe(true);
  });
  it('should set isLoading to false when logout is fulfilled', () => {
    const action = logout.fulfilled({ success: true }, '', undefined);
    const newState = userReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
  });
  it('should set isLoading to true when register is pending', () => {
    const state: IUserState = {
      ...initialState,
      isLoading: false
    };
    const action = { type: register.pending.type };
    const newState = userReducer(state, action);
    expect(newState.isLoading).toBe(true);
  });
  it('should set isLoading to false when register is fulfilled and set user', () => {
    const user = {
      name: 'Adam Smith',
      email: 'adamSmith@example.com',
      password: 'password'
    };
    const action = register.fulfilled(user, '', user);
    const newState = userReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.user).toEqual(user);
  });
});
