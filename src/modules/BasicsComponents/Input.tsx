import { componentAttr } from '#/modules';
import { createAttr } from '@/utils/index';
import { InputDataType } from 'el-plus-powerful-table-ts';
import { defineComponent } from 'vue';

export const attr: componentAttr<InputDataType> = createAttr<InputDataType>('输入框', 'input', '', {
  symbol: undefined,
  placeholder: undefined,
  disabled: false,
  style: {},
  slot: undefined
})

export default defineComponent({
  setup() {
    return () => (
      <>
        <el-form-item label='占位文本'>
        </el-form-item>
        <el-form-item label='禁用'></el-form-item>
        <el-form-item label='插槽方向'></el-form-item>
        <el-form-item label='插槽内容' prop="symbol"></el-form-item>
      </>
    )
  }
})