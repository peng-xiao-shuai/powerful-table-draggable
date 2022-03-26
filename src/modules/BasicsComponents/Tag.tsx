import { componentAttr } from '#/modules';
import { BasicsComponentType } from '#/enums';
import { createAttr } from '@/utils/index';
import { TagDataType, PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts/global';
import { defineComponent } from 'vue';
import { getCurrentData } from "@/modules/index"
import { themeOptions, tagThemeOption } from '@/modules/dict';
import { EditPen } from '@element-plus/icons-vue';

export const attr: componentAttr<TagDataType> = createAttr<TagDataType>('标签', BasicsComponentType.Tag, <EditPen />, {
  type: 'primary',
  effect: 'dark',
  // color: 'red',
  hit: false,
  number: 1,
  filter: []
})

export default defineComponent({
  setup() {
    const getFormData = () => (getCurrentData<PowerfulTableHeaderProps<any, TagDataType>>().data as TagDataType)
    
    return () => (
      <>
        <div class="grid grid-c-2">
          <el-form-item label='主题颜色'>
            <el-select v-model={getFormData().type}>
              {themeOptions.map(option => (
                <el-option label={option.label} key={option.label} value={option.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
          <el-form-item label='主题类型'>
            <el-select v-model={getFormData().effect}>
              {tagThemeOption.map(option => (
                <el-option label={option.label} key={option.label} value={option.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
        </div>
        <div class="grid grid-c-2">
          <el-form-item label='显示数量'>
            <el-input-number v-model={getFormData().number}></el-input-number>
          </el-form-item>
          <el-form-item label='是否描边'>
            <el-switch active-text="是" inactive-text="否" inline-prompt v-model={getFormData().hit}></el-switch>
          </el-form-item>
        </div>
      </>
    )
  }
})