import { componentAttr } from '#/modules';
import { createAttr } from '@/utils/index';
import { BtnDataType } from 'el-plus-powerful-table-ts';
import { defineComponent } from 'vue';

export const attr: componentAttr<BtnDataType[]> = createAttr<BtnDataType[]>('按钮', 'btn', '', [{
  tip: '',
  icon: '',
  disabled: false,
  text: '',
  isMore: false,
  type: 'primary',
  // showBtn: ((row: any, index: number) => boolean) | boolean,
  // emit: EmitType,
  isTooltip: false,
  params: {}
}])

export default defineComponent({
  setup() {
    return () => (
      <>
        <div>文本</div>
      </>
    )
  }
})