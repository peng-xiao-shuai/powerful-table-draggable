<template>
  <div class="header">
    <span>编辑区</span>

    <div class="operate">
      <el-button v-for="(item, index) in operates" :key="item.effect" size="small" type="primary" @click="handleOperate(index)">{{ item.label }}</el-button>
    </div>

    <el-drawer v-model="drawerData.value" destroy-on-close direction="rtl" size="30%" :title="operates[drawerData.index].label">
      <CodeMirror @change="handleChange" v-model:value="operates[drawerData.index].data"></CodeMirror>
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
import { header } from '@/modules/index';
const { state } = useState('')

// 编辑区操作数据
const operates = ref([{
  label: '表格数据',
  effect: 'list',
  data: JSON.stringify(state.tableLists, null, 2)
},{
  label: '配置项数据',
  effect: 'list',
  data: JSON.stringify(header.value, null, 2)
}])

const drawerData = reactive({
  value: false,
  index: 0
})

const handleOperate = (index: number) => {
  drawerData.value = true,
  drawerData.index = index
}
const handleChange = (val: string) => {
  switch (drawerData.index) {
    case 1:
      header.value = JSON.parse(val)
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

:deep(.el-drawer__header) {
  margin: 0;
}
</style>