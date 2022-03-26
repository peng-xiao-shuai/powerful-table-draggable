import { componentAttr } from '#/modules';
import { BasicsComponentType } from '#/enums';
import { createAttr } from '@/utils/index';
import { VideoDataType, PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts/global';
import { defineComponent } from 'vue';
import { getCurrentData } from "@/modules/index"
import { Film } from '@element-plus/icons-vue';

export const attr: componentAttr<VideoDataType> = createAttr<VideoDataType>('视频', BasicsComponentType.Video, <Film />, {
  poster: undefined,
  loop: false,
  style: {}
})

export default defineComponent({
  setup() {
    const getFormData = () => (getCurrentData<PowerfulTableHeaderProps<any, VideoDataType>>().data as VideoDataType)
    
    return () => (
      <>
        <el-form-item label='封面地址'>
          <el-input v-model={getFormData().poster}></el-input>
        </el-form-item>
        {/* <div class="grid grid-c-2">
          <el-form-item label='主题'>
            <el-select v-model={getFormData().type}>
              {themeOptions.map(option => (
                <el-option label={option.label} key={option.label} value={option.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
          <el-form-item label='插槽方向'>
            <el-select v-model={getFormData().target}>
              {targetOption.map(option => (
                <el-option label={option.label} key={option.label} value={option.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
        </div> */}
        <el-form-item label='是否循环'>
          <el-switch active-text="是" inactive-text="否" inline-prompt v-model={getFormData().loop}></el-switch>
        </el-form-item>
      </>
    )
  }
})