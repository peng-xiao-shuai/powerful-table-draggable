import { componentAttr } from '#/modules';
import { createAttr } from '@/utils/index';
import { PowerfulTableHeader } from 'el-plus-powerful-table-ts';
import { defineComponent } from 'vue';
import { data, header, getCurrentData } from "@/modules/index"


export const attr: componentAttr<PowerfulTableHeader> = createAttr<PowerfulTableHeader>('布局容器', 'layout', '', {
  fixed: false,
  sortable: false,
  headerAlign: 'center',
  overflowTooltip: false,
  props: [],
  label: '布局容器',
  minWidth: 80,
  width: 100,
})

export default defineComponent({
  setup() {
    return () => (
      <>
        <el-form-item label='占位文本'>
          <el-input v-model={(getCurrentData() as PowerfulTableHeader).label}></el-input>
        </el-form-item>
      </>
    )
  }
})