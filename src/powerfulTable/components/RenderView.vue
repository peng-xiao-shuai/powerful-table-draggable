<template>
  <div class="column">
    <el-table
      :class="['render-views-table', data.headerIndex == index ? 'isActive' : '']"
      :data="state.tableLists"
      ref="multipleTable"
      fit
      :border="false"
      row-key="id"
      @Selection-change="handleSelectionChange"
      @Sort-change="sortChange"
      @Row-click="rowClick"
      :style="{
        width: `${item.width || item.minWidth || 100}px`
      }"
      @Click="() => {
        data.headerIndex = index;
        data.propsIndex = -1;
        data.type = 'layout';
      }"
    >
      <el-table-column
        :fixed="item?.fixed || false"
        :sortable="item?.sortable || false"
        :header-align="item?.headerAlign || 'center'"
        :align="item?.headerAlign || 'center'"
        :show-overflow-tooltip="item?.overflowTooltip || false"
        :label="item?.label"
        :min-width="item?.minWidth || 100"
        :width="item?.width || ''"
        :class-name="item?.headerAlign || 'center'"
      >
        <template #default="scope">
          <Draggable
            :class="['drag-views', data.headerIndex == index && data.propsIndex == -1 ? 'active' : '']"
            :list="(item.props as any[])"
            @change="handleChange"
            :group="GroupName.Layout"
          >
            <template v-if="Array.isArray(item.props) && item.props.length">
              <div v-for="(prop, idx) in item.props" :class="['drag-views-prop', data.headerIndex == index && data.propsIndex == idx ? 'active' : '']"
                @click="(e: Event) => {
                e.stopPropagation()
                data.headerIndex = index,
                data.propsIndex = idx,
                data.type = prop.type
              }">
                <RenderDom :type="prop.type" :scope="scope" :prop="prop" :item="item"></RenderDom>
              </div>
            </template>
          </Draggable>
        </template>
      </el-table-column>
    </el-table>
    <MoreOperate :index="index" type="layout"></MoreOperate>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PowerfulTableHeader, PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts/global';
import { matchComponents } from '../../components/common';
import { useFunction, useState } from '../powerful-table';
import { VueDraggableNext as Draggable } from 'vue-draggable-next'
import { header, data } from '@/modules/index';
import { GroupName } from '#/enums';
import MoreOperate from "@/components/moreoperate/MoreOperate.vue";
// BUG 只有一个按钮时拖拽会多出一个
export default defineComponent({
  name: 'RenderView',
  components: {
    Draggable,
    MoreOperate,
    RenderDom: {
        props: {
            type: String,
            scope: Object,
            prop: Object,
            item: Object as PropType<PowerfulTableHeader>
        },
        setup(props) {
          return () => matchComponents(props.type, props.scope, props.prop, props.item);
        }
    }
},
  props: {
    item: {
      type: Object as PropType<PowerfulTableHeader>,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const { powerfulTableData, state } = useState({})
    const { 
      handleSelectionChange,
      sortChange,
      rowClick,
     } = useFunction(emit, powerfulTableData)

    const handleChange = ({ added }: { added: {element: any, newIndex: number}}) => {
      console.log(added, '拦截');
      
      // 拦截      
      if (!added || added?.element.type == 'layout') return
      // 重新赋值
      (header.value[props.index].props as PowerfulTableHeaderProps[])[added.newIndex] = {
        prop: `${added.element.type}-${new Date().getTime()}`,
        data: JSON.parse(JSON.stringify(added.element.data)),
        type: added.element.type,
        filter: [],
        text: '',
        reserve: '空',
        // filterItem: 'false', // 指定过滤项
        // filtersType: 'select'
      }
    }

    return {
      handleSelectionChange,
      sortChange,
      rowClick,
      matchComponents,
      handleChange,
      state,
      GroupName,
      data
    }
  }
})
</script>

<style scoped lang='scss'>

</style>