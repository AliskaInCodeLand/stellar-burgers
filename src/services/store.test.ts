import store from './store';
import { rootReducer } from './store';
import { initialState as userInitialState } from './slices/user/user-slice';
import { initialState as orderInitialState } from './slices/order/order-slice';
import { initialState as ingredientInitialState } from './slices/ingredient/ingredient-slice';
import { initialState as feedInitialState } from './slices/feed/feed-slice';
import { initialState as builderInitialState } from './slices/constructor/constructor-slice';

describe('rootReducer', () => {
  it('Проверяем, что каждый редьюсер инициализирован с правильным начальным состоянием', () => {
    const state = store.getState();

    expect(state.user).toEqual(userInitialState);
    expect(state.order).toEqual(orderInitialState);
    expect(state.ingredient).toEqual(ingredientInitialState);
    expect(state.feed).toEqual(feedInitialState);
    expect(state.builder).toEqual(builderInitialState);
  });

  it('Проверяем наличие всех необходимых редьюсеров', () => {
    const state = store.getState();

    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('ingredient');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('builder');
  });

  it('Проверяем корректность типов значений', () => {
    const state = store.getState();

    // Проверяем структуру состояния
    expect(typeof state).toBe('object');
    expect(Object.keys(state)).toHaveLength(5); // Проверяем количество редьюсеров

    // Проверяем типы значений для каждого редьюсера
    expect(typeof state.user).toBe('object');
    expect(typeof state.order).toBe('object');
    expect(typeof state.ingredient).toBe('object');
    expect(typeof state.feed).toBe('object');
    expect(typeof state.builder).toBe('object');
  });
  it('должен вернуть корректное начальное состояние при передаче undefined', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, unknownAction);

    expect(initialState).toEqual({
      builder: builderInitialState,
      ingredient: ingredientInitialState,
      feed: feedInitialState,
      order: orderInitialState,
      user: userInitialState
    });
  });
});
