import { componentAttr } from '#/modules';
import { createAttr } from '@/utils/index';
import { TextDataType } from 'el-plus-powerful-table-ts/global';
import { defineComponent } from 'vue';
import { ChatDotRound } from '@element-plus/icons-vue';
export const attr: componentAttr<TextDataType> = createAttr<TextDataType>('文本', 'text', <ChatDotRound />, {
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