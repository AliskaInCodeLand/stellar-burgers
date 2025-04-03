import builderReducer, {
    addIngredient,
    moveIngredient,
    removeIngredient,
    initialState
  } from './constructor-slice';
  import { TConstructorIngredient } from '@utils-types';
  
  describe('constructor-slice', () => {
    const ingredient1: TConstructorIngredient = {
      _id: '123',
      id: '123',
      name: 'ingredient1',
      type: 'main',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 1,
      image: 'image',
      image_large: 'image_large',
      image_mobile: 'image_mobile'
    };
    const ingredient2: TConstructorIngredient = {
      _id: '12345',
      id: '12345',
      name: 'ingredient1',
      type: 'main',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 1,
      image: 'image',
      image_large: 'image_large',
      image_mobile: 'image_mobile'
    };
  
    const bun: TConstructorIngredient = {
      _id: '123456',
      id: '123456',
      name: 'bun',
      type: 'bun',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 1,
      image: 'image',
      image_large: 'image_large',
      image_mobile: 'image_mobile'
    };
  
    const constructorState = {
      bun: bun,
      ingredients: [ingredient1, ingredient2]
    };
  
    it('should handle addIngredient add ingredient', () => {
      const state = builderReducer(initialState, addIngredient(ingredient1));
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(ingredient1);
    });
  
    it('should handle addIngredient add bun', () => {
      const state = builderReducer(initialState, addIngredient(bun));
      expect(state.bun).toEqual(bun);
    });
  
    it('should handle moveIngredient', () => {
      const state = builderReducer(
        constructorState,
        moveIngredient({ from: 0, to: 1 })
      );
      expect(state.ingredients[0]).toEqual(ingredient2);
      expect(state.ingredients[1]).toEqual(ingredient1);
    });
  
    it('should handle removeIngredient', () => {
      const state = builderReducer(constructorState, removeIngredient(0));
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(ingredient2);
    });
  });
