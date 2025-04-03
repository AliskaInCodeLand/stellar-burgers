import { IIngredientState } from './ingredient-slice';
import ingredientReducer, {
  getIngredients,
  initialState
} from './ingredient-slice';

describe('ingredientSlice', () => {
  it('should set isLoading to true when getIngredients is pending', () => {
    const state: IIngredientState = {
      ...initialState,
      isIngredientsLoading: false
    };
    const action = { type: getIngredients.pending.type };
    const newState = ingredientReducer(state, action);
    expect(newState.isIngredientsLoading).toBe(true);
  });
  it('should set isLoading to false and set ingredients when getIngredients is fulfilled', () => {
    const ingredients = [
      {
        _id: '1',
        name: 'Burger',
        type: 'bun',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 4,
        price: 5,
        image: 'https://example.com/burger.jpg',
        image_large: 'https://example.com/burger-large.jpg',
        image_mobile: 'https://example.com/burger-mobile.jpg'
      }
    ];
    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredients
    };
    const newState = ingredientReducer(initialState, action);
    expect(newState.isIngredientsLoading).toBe(false);
    expect(newState.ingredients).toEqual(ingredients);
  });
  it('should set isLoading to false and set error when getIngredients is rejected', () => {
    const error = {
      message: 'Произошла ошибка'
    };
    const action = { type: getIngredients.rejected.type, error };
    const newState = ingredientReducer(initialState, action);
    expect(newState.isIngredientsLoading).toBe(false);
    expect(newState.error).toBe(error.message);
  });
});
