import { defineComponent, PropType, toRefs, getCurrentInstance, reactive } from "vue";
import { PowerfulTableHeader, PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts';
import { matchComponents } from './common';
import { useFunction, useState } from '../powerful-table';
import { VueDraggableNext as Draggable } from 'vue-draggable-next'
import { header, GroupName, data } from '@/modules/index';

export default defineComponent({
  components: {
    Draggable
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
    const { item } = toRefs(props)
    
    const { powerfulTableData, state } = useState({})
    const { 
      handleSelectionChange,
      sortChange,
      rowClick,
      returnEmit
     } = useFunction(emit, powerfulTableData)

    const log = ({ added }: { added: {element: any, newIndex: number}}) => {
      // 拦截      
      if (!added || added?.element.type == 'layout') return
      // 重新赋值
      (header.value[props.index].props as PowerfulTableHeaderProps[])[added.newIndex] = {
        prop: `${added.element.type}-${new Date().getTime()}`,
        data: added.element.data,
        type: added.element.type,
        filter: [],
        text: '',
        reserve: '空',
        // filterItem: 'false', // 指定过滤项
        // filtersType: 'select'
      }
    }

    return () => (
      <>
        {item.value}
        <el-table
          class="render-views-table"
          data={state.tableLists}
          ref="multipleTable"
          border
          fit
          row-key="id"
          highlight-current-row
          onSelection-change={handleSelectionChange}
          onSort-change={sortChange}
          onRow-click={rowClick}
          style={{
            width: `${item.value.width || item.value.minWidth || 100}px`
          }}
          // 修改右侧视图数据
          onClick={() => {
            data.headerIndex = props.index;
            data.propsIndex = -1;
            data.type = 'layout';
          }}
        >
          <el-table-column
            v-slots={{
              default: (scope: any) => (
                <Draggable class={['drag-views', data.headerIndex == props.index && data.propsIndex == -1 ? 'active' : '']} list={item.value.props as PowerfulTableHeaderProps[]} onChange={log} group={GroupName.Layout}>
                  {Array.isArray(item.value.props) && item.value.props.length
                    ? item.value.props.map((prop, index) => (
                        <div class={['drag-views-prop', data.headerIndex == props.index && data.propsIndex == index ? 'active' : '']} onClick={(e: Event) => {
                          e.stopPropagation()
                          data.headerIndex = props.index,
                          data.propsIndex = scope.$index,
                          data.type = prop.type
                        }}>
                          { matchComponents(prop.type, scope, prop, props) }
                        </div>
                      ))
                    : ''}
                </Draggable>
              )
            }}
            fixed={item.value?.fixed || false}
            sortable={item.value?.sortable || false}
            header-align={item.value?.headerAlign || 'center'}
            align={item.value?.headerAlign || 'center'}
            show-overflow-tooltip={item.value?.overflowTooltip || false}
            // prop={item.value?.props ? Array.isArray(item.value.props) ? item.value.props[0].prop : item.value.props.prop : ''}
            label={item.value?.label}
            min-width={item.value?.minWidth || 100}
            width={item.value?.width || ''}
            class-name={item.value?.headerAlign || 'center'}
          >
            {/* TODO 内置自定义表头 */}
            {/* <template v-if="item.filters && (item.isShowOrFilterColumn == undefined || item.isShowOrFilterColumn === 'filter') && !item.headerSlotName" #header>
              <f-select
                v-if="
                  getPropObj(item).filter ||
                  getPropObj(item).filtersType === 'select' ||
                  getPropObj(item).type === 'switch' ||
                  getPropObj(item).type === 'tag'
                "
                :header-data="item"
                :list="list"
                :prop-data="getPropObj(item)"
                @headerFilterChange="headerFilterChange"
              ></f-select>
              <f-date-picker
                v-else-if="getPropObj(item).filtersType === 'date'"
                :header-data="item"
                :list="list"
                @headerFilterChange="headerFilterChange"
              ></f-date-picker>
              <f-input
                v-else
                :header-data="item"
                :list="list"
                @headerFilterChange="headerFilterChange"
              ></f-input>
            </template> */}
          </el-table-column>
        </el-table>
      </>
    )
  }
})