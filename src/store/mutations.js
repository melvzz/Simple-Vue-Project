import { set } from 'vue';
import * as types from './mutation-types';

function updateCartFood(state, food, count){
  set(state.cartFood, food.id, {food: food, count: count});
}

export default {
  [types.UPDATE_CART]: function(state, {food, count}){
    updateCartFood(state, food, count);
  },
  [types.EMPTY]: function(state){
    state.cartFood = {};
  }
}

