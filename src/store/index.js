import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 2,
    alert: false,
    list: [],
  },
  mutations: {
    increment(state) {
      state.count++
    },
    
    alert(state) {
      state.alert = !state.alert;
    },
    addList(state,item){
      state.list.push(item);
      var l = state.list;
      state.list = null;
      state.list = l;
    },
    
  },
  actions: {
  },
  modules: {
  }
})
