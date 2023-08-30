import Vue from 'vue'
import Vuex from 'vuex'

// axios 非同步請求
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 所有的任務列表
    list: [],
    // 輸入框的內容
    inputValue: '123'
  },

  mutations: {
    // 不能寫非同步的操作
    // 參數是state，觸發是commit
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, val) {
      state.inputValue = val
    }

  },

  actions: {
    // 非同步在這
    // 參數是mutation，不能直接修改state，觸發是dispatch
    getList (context) {
      axios.get('/Test/todolist/static/list.json')
        .then(({data}) => {
        // console.log(data)
          context.commit('initList', data)
        })
    }
  },

  getters: {
    // 不修改state數值，觸發是getter
  }
})
export default store
