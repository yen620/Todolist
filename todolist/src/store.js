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
    inputValue: '123',
    // 下一ID
    nextId: 5,

    viewKey: 'all'
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

    // 添加列表項
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },

    // 根據Id刪除
    removedItem (state, id) {
      // 先查
      const i = state.list.findIndex(x => x.id === id)
      // 再刪
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },

    // 修改列表中的選取狀態
    changeStatues (state, parma) {
      const i = state.list.findIndex(x => x.id === parma.id)
      if (i !== -1) {
        state.list[i].done = parma.status
      }
    },

    // 清除已完成
    cleanDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },

    // 修改顯示畫面的key
    changeViewKey (state, key) {
      state.viewKey = key
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

    // 未完成數量
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).langth
    },

    // 顯示全部 已完成 未完成 畫面
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  }

})
export default store
