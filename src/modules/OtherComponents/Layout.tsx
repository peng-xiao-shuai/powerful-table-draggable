import { componentAttr } from '#/modules';
import { createAttr } from '@/utils/index';
import { PowerfulTableHeader } from 'el-plus-powerful-table-ts';
import { defineComponent } from 'vue';
import { getCurrentData } from "@/modules/index"
import { sortableOptions, fixedOptions, alignOptions } from "@/modules/dict"
import { FormItemLabelToolTip } from '@/powerfulTable/components/common';

export const attr: componentAttr<PowerfulTableHeader> = createAttr<PowerfulTableHeader>('布局容器', 'layout', '', {
  fixed: false,
  sortable: false,
  headerAlign: 'center',
  overflowTooltip: false,
  props: [],
  label: '布局容器',
  minWidth: 80,
  width: 100,
})

export default defineComponent({
  setup() {
    return () => (
      <>
        <el-form-item label='表头文字'>
          <el-input v-model={getCurrentData().label}></el-input>
        </el-form-item>
        <div class="grid grid-c-2">
          <el-form-item label='宽度'>
            <el-input v-model={getCurrentData().width}></el-input>
          </el-form-item>
          <el-form-item label='最小宽度'>
            <el-input v-model={getCurrentData().minWidth}></el-input>
          </el-form-item>
        </div>
        <div class="grid grid-c-3">
          <el-form-item label='表头对齐方式'>
            <el-select v-model={getCurrentData().headerAlign}>
              {alignOptions.map(option => (
                <el-option label={option.label} key={option.label} value={option.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
          <el-form-item label='排序'>
            <el-select v-model={getCurrentData().sortable}>
              {sortableOptions.map(option => (
                <el-option label={option.label} key={option.label} value={option.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
          <el-form-item label='固定'>
            <el-select v-model={getCurrentData().fixed}>
              {fixedOptions.map(option => (
                <el-option label={option.label} key={option.label} value={option.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
        </div>
        {/* <div class="grid grid-c-2"> */}
          <el-form-item v-slots={FormItemLabelToolTip('显示 tooltip 提示', '当内容过长被隐藏时显示 tooltip')}>
            <el-switch active-text="是" inactive-text="否" inline-prompt v-model={getCurrentData().overflowTooltip}></el-switch>
          </el-form-item>
        {/* </div> */}
      </>
    )
  }
})