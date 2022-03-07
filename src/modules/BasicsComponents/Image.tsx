import { componentAttr } from '#/modules';
import { createAttr } from '@/utils/index';
import { ImageDataType, PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts';
import { defineComponent } from 'vue';
import { getCurrentData } from "@/modules/index"
import { imageFitOption } from '@/modules/dict';
import { Picture } from '@element-plus/icons-vue';

export const attr: componentAttr<ImageDataType> = createAttr<ImageDataType>('图片', 'image', <Picture />, {
  preview: false,
  lazy: false,
  zIndex: 2000,
  style: undefined,
  fit: 'cover'
})

export default defineComponent({
  setup() {
    const getFormData = () => (getCurrentData<PowerfulTableHeaderProps<any, ImageDataType>>().data as ImageDataType)

    return () => (
      <>
        <div class="grid grid-c-2">
          <el-form-item label='填充类型'>
            <el-select v-model={getFormData().fit}>
              {imageFitOption.map(option => (
                <el-option label={option.label} key={option.label} value={option.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
          <el-form-item label='图片层级' prop="zIndex">
            <el-input-number v-model={getFormData().zIndex}></el-input-number>
          </el-form-item>
        </div>
        <div class="grid grid-c-2">
          <el-form-item label='是否预览'>
            <el-switch active-text="是" inactive-text="否" inline-prompt v-model={getFormData().preview}></el-switch>
          </el-form-item>
          <el-form-item label='是否懒加载'>
            <el-switch active-text="是" inactive-text="否" inline-prompt v-model={getFormData().lazy}></el-switch>
          </el-form-item>
        </div>
      </>
    )
  }
})