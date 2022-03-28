import { componentAttr } from '#/modules';
import { BasicsComponentType } from '#/enums';
import { createAttr } from '@/utils/index';
import { TextDataType, PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts/global';
import { defineComponent } from 'vue';
import { getCurrentData } from "@/modules/index"
import { ChatDotRound } from '@element-plus/icons-vue';
export const attr: componentAttr<TextDataType> = createAttr<TextDataType>('文本', BasicsComponentType.Text, <ChatDotRound />, {
  line: 1,
  develop: false,
  // customFilterFun: undefined
})

export default defineComponent({
  setup() {
    const getFormData = () => (getCurrentData<PowerfulTableHeaderProps<any, TextDataType>>().data as TextDataType)

    return () => (
      <>
        <div class="grid grid-c-2">
          <el-form-item label='是否显示 “展开/收起” '>
            <el-switch active-text="是" inactive-text="否" inline-prompt v-model={getFormData().develop}></el-switch>
          </el-form-item>
          {
            getFormData().develop
            ? <el-form-item label='超出行使用...代替'>
                <el-input-number v-model={getFormData().line}></el-input-number>
              </el-form-item>
            : <span></span>
          }
        </div>
      </>
    )
  }
})