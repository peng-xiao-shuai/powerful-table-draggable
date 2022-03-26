import { componentAttr } from '#/modules';
import { BasicsComponentType } from '#/enums';
import { createAttr } from '@/utils/index';
import { IconFontDataType, PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts/global';
import { defineComponent, ref } from 'vue';
import { getCurrentData } from "@/modules/index"
import { Plus } from '@element-plus/icons-vue';
import { Orange } from '@element-plus/icons-vue';

export const attr: componentAttr<IconFontDataType> = createAttr<IconFontDataType>('图标', BasicsComponentType.Iconfont, <Orange />, {
  class: [],
  style: {}
})

export default defineComponent({
  setup() {
    const getFormData = () => (getCurrentData<PowerfulTableHeaderProps<any, IconFontDataType>>().data as IconFontDataType)
    const value = ref('')
    const status = ref(false)
    return () => (
      <>
        <el-form-item v-slots={{
          label: () => (
            <div style="display: flex">
              <div style="margin-right: 10px">样式名称</div>
              {
                status.value
                ? <el-input autofocus style="flex: 1" v-model={value.value} size="small"
                    onChange={
                      () => {
                        status.value = false;
                        (getFormData().class as string[]).push(value.value)
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
            (getFormData().class as string[]).map((_, index) => (
              <el-tag key={'class-' + index} closable onClose={() => (getFormData().class as string[]).splice(index, 1)}>{ _ }</el-tag>
            ))
          }
        </el-form-item>
      </>
    )
  }
})