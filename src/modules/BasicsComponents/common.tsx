import { PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts';
import { defineComponent } from 'vue';
import { getCurrentData } from "@/modules/index"

export default defineComponent({
  setup() {
    return () => (
      <>
        <div class="grid grid-c-2">
          <el-form-item label='prop值'>
            <el-input v-model={getCurrentData<PowerfulTableHeaderProps>().prop}></el-input>
          </el-form-item>
          <el-form-item label='文字前缀'>
            <el-input v-model={getCurrentData<PowerfulTableHeaderProps>().text}></el-input>
          </el-form-item>
        </div>
        <el-form-item label='数据空时占位'>
          <el-input v-model={getCurrentData<PowerfulTableHeaderProps>().reserve}></el-input>
        </el-form-item>
      </>
    )
  }
})