import { componentAttr } from '#/modules';
import { createAttr } from '@/utils/index';
import { SwitchDataType, PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts/global';
import { defineComponent } from 'vue';
import { getCurrentData } from "@/modules/index"
import { Open } from '@element-plus/icons-vue';

export const attr: componentAttr<SwitchDataType> = createAttr<SwitchDataType>('开关', 'switch', <Open />, {
  activeColor: undefined,
  inactiveColor: undefined,
  inactiveText: '',
  activeText: '',
  activeValue: 1,
  inactiveValue: 0,
  disabled: false
})

export default defineComponent({
  setup() {
    const getFormData = () => (getCurrentData<PowerfulTableHeaderProps<any, SwitchDataType>>().data as SwitchDataType)
    
    return () => (
      <>
        <div class="grid grid-c-2">
          <el-form-item label='状态 on 时颜色'>
            <el-color-picker v-model={getFormData().activeColor} />
          </el-form-item>
          <el-form-item label='状态 off 时颜色'>
            <el-color-picker v-model={getFormData().inactiveColor} />
          </el-form-item>
        </div>
        <div class="grid grid-c-2">
          <el-form-item label='状态 on 时文本'>
            <el-input v-model={getFormData().activeText} />
          </el-form-item>
          <el-form-item label='状态 off 时文本'>
            <el-input v-model={getFormData().inactiveText} />
          </el-form-item>
        </div>
        <div class="grid grid-c-2">
          <el-form-item label='状态 on 时值'>
            <el-input v-model={getFormData().activeValue} />
          </el-form-item>
          <el-form-item label='状态 off 时值'>
            <el-input v-model={getFormData().inactiveValue} />
          </el-form-item>
        </div>
        <el-form-item label='禁用'>
          <el-switch active-text="是" inactive-text="否" inline-prompt v-model={getFormData().disabled}></el-switch>
        </el-form-item>
      </>
    )
  }
})