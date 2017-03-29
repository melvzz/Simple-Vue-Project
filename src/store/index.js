import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
  cartFood: {}
};

export default new Vuex.Store({
  state: state,
  actions: actions,
  getters: getters,
  mutations: mutations
});
