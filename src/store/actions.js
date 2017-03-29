import * as types from './mutation-types';

export const updateCart = function({commit}, payload){
  commit(types.UPDATE_CART, payload);
};

export const empty = function({commit}){
  commit(types.EMPTY);
}



