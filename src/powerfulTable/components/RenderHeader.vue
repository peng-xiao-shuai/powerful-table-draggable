<template>
  <div class="header">
    <span>编辑区</span>

    <div class="operate">
      <el-button v-for="item in operates" :key="item.effect" type="primary" @click="handleOperate(item)">{{ item.label }}</el-button>
    </div>

    <el-drawer v-model="drawerData.value" direction="rtl" :title="drawerData.title">
      <CodeMirror v-model:value="a"></CodeMirror>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import CodeMirror from '@/components/codemirror/CodeMirror.vue';
// 编辑区操作数据
const operates = ref([{
  label: '表格数据',
  effect: 'list'
}])

const a = ref("{'a':'1'}")

const drawerData = reactive({
  value: false,
  title: ''
})

const handleOperate = (operate: typeof operates.value[0]) => {
  switch(operate.effect) {
    case 'list':
      drawerData.value = true,
      drawerData.title = operate.label
      break;
  }
  
}
</script>

<style scoped lang='scss'>
.header {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  background: #fff;
  justify-content: space-between;
}
</style>