<template>
  <div id=  "app">
    <a-input placeholder="請輸入代辦事項" class="my_ipt"
      :value="inputValue" @change="handleInputChange"/>
    <a-button type="primary" @click="addItemToList" >新增事項</a-button>

    <a-list bordered: this.dataSource ="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- checkbox -->
        <a-checkbox :checked="item.done" @change="(e)=>{cbStateChanged(e,item.id)}">{{ item.info }}</a-checkbox>
        <!-- 刪除連結 -->
        <a slot="actions" @click="removedItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer -->
      <div class="footer" slot="footer">
        <span> 還有{{unDoneLength}}件未完成事項</span>
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary' : 'dfault'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey === 'undone' ? 'primary' : 'dfault'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary' : 'dfault'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  data () {
    return { list: [] }
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'infoList'])
  },
  methods: {
    // 監聽輸入內容
    handleInputChange (e) {
      // console.log(e.target.value)
      this.$store.commit('seInputValuet', e.target.value)
    },

    // 新增 Item 項
    addItemToList () {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warring('輸入框內容不得為空!')
      }
      this.$store.commit('addItem')
    },

    // 根據ID刪除項目
    removedItemById (id) {
      // console.log(id)
      this.$store.commit('removedItem', id)
    },

    // checkbox change
    cbStateChanged (e, id) {
      // console.log(e.target.checked)
      // console.log(id)
      const param = {
        id: id,
        status: e.target.checked
      }

      this.$store.commit('changeStatues', param)
    },

    // 清除已完成
    clean () {
      this.$store.commit('cleanDone')
    },

    // 修改顯示的列表
    changeList (key) {
      console.log(key)
      this.$store.commit('changeViewKey', key)
    }
  }
}

</script>
<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
