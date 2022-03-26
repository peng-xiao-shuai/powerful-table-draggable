import { componentAttr } from '#/modules';
import { BasicsComponentType } from '#/enums';
import { createAttr } from '@/utils/index';
import { TextDataType } from 'el-plus-powerful-table-ts/global';
import { defineComponent } from 'vue';
import { ChatDotRound } from '@element-plus/icons-vue';
export const attr: componentAttr<TextDataType> = createAttr<TextDataType>('文本', BasicsComponentType.Text, <ChatDotRound />, {
  line: undefined,
  develop: undefined,
  customFilterFun: undefined
})

export default defineComponent({
  setup() {
    return () => (
      <>
        <div>文本</div>
      </>
    )
  }
})