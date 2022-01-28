<template>
  <splitpanes class="default-theme" style="height: 600px">
    <pane min-size="20" max-size="20">
        <div
          class="left"
          v-for="item in components"
          :key="item.label"
        >
          <span>{{item.label}}</span>
          <draggable
              class="left-components"
              :list="item.list"
              :sort="false"
              @change="log"
              :move="checkMove"
              :group="{
                name: item.group,
                pull: 'clone',
                put: false,
              }"
            >
            <div v-for="each in item.list" :key="each.label" class="left-components-item">
              <el-icon>
                <component :is="each.icon"></component>
              </el-icon>
              <span>{{each.label}}</span>
            </div>
          </draggable>
        </div>
    </pane>
    <pane min-size="50">
      <draggable
        class="drag-views"
        :list="header"
        @change="log"
        :move="checkMove"
        :group="GroupName.People"
      >
        <RenderView
          v-for="(item, index) in header"
          :key="index"
          :item="item"
          :index="index"
        >
        </RenderView>
      </draggable>
    </pane>
    <pane min-size="20" max-size="30">
      <ConfigData></ConfigData>
    </pane>
  </splitpanes>
</template>
<script lang="ts">
import { defineComponent, provide, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue';
import { VueDraggableNext } from 'vue-draggable-next'
import RenderView from './components/RenderView';
import ConfigData from './components/ConfigData';
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { PowerfulTableHeader } from 'el-plus-powerful-table-ts';
// 视图的数据 相当于powerful-table-ts 组件的 header
import { listComponent, header, GroupName } from '@/modules/index';

// 获取 布局方向
const justifyFun = (val: string) => {
  const bol = ["center", "left", "right"].includes(val);
  return bol
    ? { center: "center", left: "flex-start", right: "flex-end" }[val]
    : "center";
};
export default defineComponent({
  components: {
    Search,
    draggable: VueDraggableNext,
    RenderView,
    ConfigData,
    Splitpanes,
    Pane
  },
  setup() {
    provide("justifyFun", justifyFun);
    const components = listComponent
    const data = reactive({})
    const log = ({ added }: { added: {element: any, newIndex: number}}) => {
      if (!added) return
      
      switch (added.element.type) {
        case 'layout':
          header.value[added.newIndex] = JSON.parse(JSON.stringify(added.element.data))
          break
        default:
      }
    }
    const checkMove = (evt: any) => {
      console.log(evt);
      return (evt.draggedContext.element.name !== 'apple');
    }
    return {
      components,
      GroupName,
      header,
      log,
      checkMove
    }
  }
})
</script>

<style lang="scss" scoped>
.left {
  padding: 0 10px;
  & > span {
    font-weight: bold;
    color: #333;
    font-size: 14px;
    margin: 10px 0;
    display: inline-block;
  }

  &-components {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    &-item:nth-child(even) {
      margin-left: 10px;
      width: calc(50% - 10px);
    }
    &-item {
      box-sizing: border-box;
      width: 50%;
      background: #fff;
      color: #666;
      display: flex;
      justify-content: start;
      align-items: center;
      padding: 8px;
      border-radius: 4px;
      font-size: 14px;
      box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, .1);
      margin-bottom: 10px;
      transition: all .4s;
      cursor: pointer;

      &:hover {
        background: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
      }

      & > .el-icon {
        margin-right: 8px;
      }
   }
  }
}

</style>