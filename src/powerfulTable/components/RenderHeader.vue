<template>
  <div class="header">
    <span>编辑区</span>

    <div class="operate">
      <el-button v-for="(item, index) in operates" :key="item.effect" size="small" type="primary" @click="handleOperate(index)">{{ item.label }}</el-button>
    </div>

    <el-drawer v-model="drawerData.value" direction="rtl" :title="operates[drawerData.index].label">
      <CodeMirror v-model:value="operates[drawerData.index].data"></CodeMirror>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import CodeMirror from '@/components/codemirror/CodeMirror.vue';
import { useState } from '../powerful-table';
const { state } = useState('')

// 编辑区操作数据
const operates = ref([{
  label: '表格数据',
  effect: 'list',
  data: JSON.stringify(state.tableLists)
}])

const drawerData = reactive({
  value: false,
  index: 0
})

const handleOperate = (index: number) => {
  drawerData.value = true,
  drawerData.index = index
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

:deep(.el-drawer__header) {
  margin: 0;
}
</style>