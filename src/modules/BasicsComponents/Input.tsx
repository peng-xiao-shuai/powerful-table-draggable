import { componentAttr } from '#/modules';
import { createAttr } from '@/utils/index';
import { InputDataType, PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts';
import { defineComponent } from 'vue';
import { getCurrentData } from "@/modules/index"
import { inputSlotDirection, disabledOptions } from '@/modules/dict';

export const attr: componentAttr<InputDataType> = createAttr<InputDataType>('输入框', 'input', '', {
  symbol: undefined,
  placeholder: '',
  disabled: false,
  style: {},
  slot: undefined
})

export default defineComponent({
  setup() {
    const getFormData = () => (getCurrentData<PowerfulTableHeaderProps<any, InputDataType>>().data as InputDataType)
    
    return () => (
      <>
        <div class="grid grid-c-2">
          <el-form-item label='占位文本'>
            <el-input v-model={getFormData().placeholder}></el-input>
          </el-form-item>
          <el-form-item label='插槽方向'>
            <el-select v-model={getFormData().disabled}>
              {disabledOptions.map(option => (
                <el-option label={option.label} key={option.label} value={option.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label='禁用'>
          {inputSlotDirection.map(option => (
            <el-radio v-model={getFormData().slot} label={option.value}>{option.label}</el-radio>
          ))}
        </el-form-item>
        {
          getFormData().slot
          ? <el-form-item label='插槽内容' prop="symbol">
              <el-input v-model={getFormData().symbol}></el-input>
            </el-form-item>
          : ""
        }
      </>
    )
  }
})