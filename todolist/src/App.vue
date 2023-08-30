<template>
  <div id=  "app">
    <a-input placeholder="請輸入代辦事項" class="my_ipt"
      :value="inputValue" @change="handleInputChange"/>
    <a-button type="primary" @click="addItemToList" >新增事項</a-button>

    <a-list bordered: this.dataSource ="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- checkbox -->
        <a-checkbox>{{ item.info }}</a-checkbox>
        <!-- 刪除連結 -->
        <a slot="actions">删除</a>
      </a-list-item>

      <!-- footer -->
      <div class="footer" slot="footer">
        <span>還有0件未完成事項</span>
        <a-button-group>
          <a-button type="primary">全部</a-button>
          <a-button>未完成</a-button>
          <a-button>已完成</a-button>
        </a-button-group>
        <a>清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  data () {
    return { list: [] }
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputValue'])
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
