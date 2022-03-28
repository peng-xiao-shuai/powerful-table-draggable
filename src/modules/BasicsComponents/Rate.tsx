import { componentAttr } from '#/modules';
import { BasicsComponentType } from '#/enums';
import { createAttr } from '@/utils/index';
import { RateDataType, PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts/global';
import { defineComponent, ref } from 'vue';
import { getCurrentData } from "@/modules/index"
import { FormItemLabelAdd } from '@/components/common';
import { Star, Plus } from '@element-plus/icons-vue';

export const attr: componentAttr<RateDataType> = createAttr<RateDataType>('评分', BasicsComponentType.Rate, <Star />, {
  max: 5,
  colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
  iconClass: ['el-icon-star-on','el-icon-star-on','el-icon-star-on'],
  allowHalf: false,
  showText: false,
  showScore: false,
  texts: undefined
})

export default defineComponent({
  setup() {
    const getFormData = () => (getCurrentData<PowerfulTableHeaderProps<any, RateDataType>>().data as RateDataType)
    const value = ref('')
    const status = ref(false)

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
          ? <el-form-item v-slots={{
            label: () => (
              <div style="display: flex">
                <div style="margin-right: 10px">辅助文字</div>
                {
                  status.value
                  ? <el-input autofocus style="flex: 1" v-model={value.value} size="small"
                      onChange={
                        () => {
                          status.value = false;
                          getFormData().texts?.push(value.value)
                          value.value = '';
                        }
                      }
                    />
                  : <el-button onClick={() => status.value = true} type="primary" size="small" icon={<Plus />} />
                }
              </div>
            )
          }}>
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