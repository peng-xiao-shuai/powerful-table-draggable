import { componentAttr } from '#/modules';
import { BasicsComponentType } from '#/enums';
import { createAttr } from '@/utils/index';
import { HrefDataType, PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts/global';
import { defineComponent } from 'vue';
import { getCurrentData } from "@/modules/index"
import { themeOptions, targetOption } from '@/modules/dict';
import { Paperclip } from '@element-plus/icons-vue';

export const attr: componentAttr<HrefDataType> = createAttr<HrefDataType>('超链接', BasicsComponentType.Link, <Paperclip />, {
  target: '_block',
  style: undefined,
  type: 'primary',
  underline: true,
  text: undefined
})

export default defineComponent({
  setup() {
    const getFormData = () => (getCurrentData<PowerfulTableHeaderProps<any, HrefDataType>>().data as HrefDataType)
    
    return () => (
      <>
        <el-form-item label='占位文本'>
          <el-input v-model={getFormData().text}></el-input>
        </el-form-item>
        <div class="grid grid-c-2">
          <el-form-item label='主题'>
            <el-select v-model={getFormData().type}>
              {themeOptions.map(option => (
                <el-option label={option.label} key={option.label} value={option.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
          <el-form-item label='跳转类型'>
            <el-select v-model={getFormData().target}>
              {targetOption.map(option => (
                <el-option label={option.label} key={option.label} value={option.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label='下划线'>
          <el-switch active-text="是" inactive-text="否" inline-prompt v-model={getFormData().underline}></el-switch>
        </el-form-item>
      </>
    )
  }
})