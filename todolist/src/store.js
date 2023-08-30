import Vue from 'vue'
import Vuex from 'vuex'

// axios 非同步請求
// import axios from 'axios '

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 所有的任務列表
    list: [],
    // 輸入框的內容
    inputValue: '123',
    // 下一ID
    nextId: 5
  },

  mutations: {
    // 不能寫非同步的操作
    // 參數是state，觸發是commit

    initList (state, list) {
      state.list = list
    },

    // 為 store 中的 inputValue 賦值
    setInputValue (state, val) {
      state.inputValue = val
    },

    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    }

  },

  actions: {
    // 非同步在這
    // 參數是mutation，不能直接修改state，觸發是dispatch
    getList (context) {
      // eslint-disable-next-line no-undef
      axios.get('/list.json')
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
