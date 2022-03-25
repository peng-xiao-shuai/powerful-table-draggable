import { componentAttr } from '#/modules';
import { createAttr } from '@/utils/index';
import { RateDataType, PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts/global';
import { defineComponent } from 'vue';
import { getCurrentData } from "@/modules/index"
import { FormItemLabelAdd } from '@/components/common';
import { Star } from '@element-plus/icons-vue';

export const attr: componentAttr<RateDataType> = createAttr<RateDataType>('评分', 'rate', <Star />, {
  max: 5,
  colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
  iconClass: ['el-icon-star-on','el-icon-star-on','el-icon-star-on'],
  allowHalf: false,
  showText: false,
  showScore: false,
  texts: ['极差', '失望', '一般', '满意', '惊喜']
})

export default defineComponent({
  setup() {
    const getFormData = () => (getCurrentData<PowerfulTableHeaderProps<any, RateDataType>>().data as RateDataType)
    
    return () => (
      <>
        <div class="grid grid-c-2">
          <el-form-item label='最大分值'>
            <el-input-number v-model={getFormData().max}></el-input-number>
          </el-form-item>
          <el-form-item label='是否允许半选'>
            <el-switch active-text="是" inactive-text="否" inline-prompt v-model={getFormData().allowHalf}></el-switch>
          </el-form-item>
        </div>
        <div class="grid grid-c-2">
          <el-form-item label='是否显示分数'>
            <el-switch active-text="是" inactive-text="否" inline-prompt v-model={getFormData().showScore}></el-switch>
          </el-form-item>
          <el-form-item label='是否辅助文字'>
            <el-switch active-text="是" inactive-text="否" inline-prompt v-model={getFormData().showText}></el-switch>
          </el-form-item>
        </div>
        <el-form-item v-slots={FormItemLabelAdd('颜色', 'color', (e: string) => getFormData().colors?.push(e))}>
          {
            getFormData().colors?.map((_, index) => (
              <el-tag key={'color-' + index} closable onClose={() => getFormData().colors?.splice(index, 1)}>{ _ }</el-tag>
            ))
          }
        </el-form-item>
        {
          getFormData().showText
          ? <el-form-item v-slots={FormItemLabelAdd('辅助文字', 'input', (e: string) => getFormData().texts?.push(e))}>
              {
                getFormData().texts?.map((_, index) => (
                  <el-tag key={'texts-' + index} closable onClose={() => getFormData().texts?.splice(index, 1)}>{ _ }</el-tag>
                ))
              }
            </el-form-item>
          : <span></span>
        }
      </>
    )
  }
})