import { componentAttr } from '#/modules';
import { createAttr } from '@/utils/index';
import { PowerfulTableHeader } from 'el-plus-powerful-table-ts';
import { defineComponent } from 'vue';
import { getCurrentData } from "@/modules/index"
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
    const sortableOptions = [{
      label: '排序',
      value: true
    },{
      label: '不排序',
      value: false
    },{
      label: '自定义',
      value: 'custom'
    }]
    const fixedOptions = [{
      label: '不固定',
      value: false
    },{
      label: '固定左侧',
      value: 'left'
    },{
      label: '固定右侧',
      value: 'right'
    }]
    const overflowTooltipOption = [{
      label: '显示提示',
      value: true
    },{
      label: '不显示提示',
      value: false
    }]
    return () => (
      <>
        <el-form-item label='表头文字'>
          <el-input v-model={(getCurrentData() as PowerfulTableHeader).label}></el-input>
        </el-form-item>
        <el-form-item label='表头对齐方式'>
          <el-input v-model={(getCurrentData() as PowerfulTableHeader).headerAlign}></el-input>
        </el-form-item>
        <div class="grid grid-c-2">
          <el-form-item label='宽度'>
            <el-input v-model={(getCurrentData() as PowerfulTableHeader).width}></el-input>
          </el-form-item>
          <el-form-item label='最小宽度'>
            <el-input v-model={(getCurrentData() as PowerfulTableHeader).minWidth}></el-input>
          </el-form-item>
        </div>
        <el-form-item v-slots={FormItemLabelToolTip('显示 tooltip', '当内容过长被隐藏时显示 tooltip')}>
          {overflowTooltipOption.map(option => (
            <el-radio v-model={(getCurrentData() as PowerfulTableHeader).overflowTooltip} label={option.value}>{option.label}</el-radio>
          ))}
        </el-form-item>
        <div class="grid grid-c-2">
          <el-form-item label='排序'>
            <el-select v-model={(getCurrentData() as PowerfulTableHeader).sortable}>
              {sortableOptions.map(option => (
                <el-option label={option.label} key={option.label} value={option.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
          <el-form-item label='固定'>
            <el-select v-model={(getCurrentData() as PowerfulTableHeader).fixed}>
              {fixedOptions.map(option => (
                <el-option label={option.label} key={option.label} value={option.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
        </div>
      </>
    )
  }
})