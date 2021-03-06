<template>
  <splitpanes class="default-theme" style="height: 600px">
    <pane min-size="20" max-size="20" style="background: #F5F5F9">
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
            <div v-for="each in item.list" :key="each.label" class="left-components-item" :style="draggableHoverStyle">
              <!-- 直接写component :is 的话会有警告，通过使用tsx写法没有警告 -->
              <RenderIcon :icon="each.icon"></RenderIcon>
              <span>{{each.label}}</span>
            </div>
          </draggable>
        </div>
    </pane>
    <pane min-size="50">
      <!-- 编辑区头部 -->
      <RenderHeader></RenderHeader>

      <draggable
        class="drag-views"
        :list="header"
        @change="log"
        :move="checkMove"
        :group="GroupName.People"
        style="padding: 10px;"
        :animation="200"
      >
        <RenderView
          v-for="(item, index) in header"
          :key="item.label + index"
          :item="item"
          :index="index"
        >
        </RenderView>
      </draggable>
    </pane>
    <pane class="right-view" min-size="20" max-size="30">
      <ConfigData></ConfigData>
    </pane>
  </splitpanes>
</template>
<script lang="ts">
import { defineComponent, PropType, provide, ref, Component } from 'vue'
import { Search } from '@element-plus/icons-vue';
import { VueDraggableNext } from 'vue-draggable-next'
import RenderView from './components/RenderView.vue';
import RenderHeader from './components/RenderHeader.vue';
import ConfigData from './components/ConfigData';
import { leftRenderIcon } from '../components/common';
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { draggableHoverStyle, useState } from './powerful-table';
// 视图的数据 相当于powerful-table-ts 组件的 header
import { listComponent, header, data } from '@/modules/index';
import { GroupName } from '#/enums';
import en from "element-plus/lib/locale/lang/en";

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
    RenderHeader,
    ConfigData,
    Splitpanes,
    Pane,
    RenderIcon: {
      props: {
        icon: {
          type: [Object, String] as PropType<Component | string>,
          default: () => {}
        }
      },
      setup(props) {
        return () => leftRenderIcon(props.icon)
      }
    }
  },
  setup(props) {
    const { injectProps } = useState({})
    /* ------ 注入数据 ------ */
    // TODO powerful-table-ts props 未传递
    // TODO 当每个布局容器中只有一个元素的时候不能拖拽
    // 语言
    provide("locale", props?.locale || (injectProps && injectProps.locale) || en);
    // 组件大小
    provide("size", props?.size || injectProps?.size || "small");
    // 单元格内布局
    provide("justifyFun", justifyFun);
    const components = listComponent
    // 当前拖动的下标
    const dragIndex = ref(0)

    const log = ({ added }: { added: {element: any, newIndex: number}}, e: any) => {
      data.headerIndex = dragIndex.value
      
      if (!added) return
      switch (added.element.type) {
        case 'layout':
          header.value[added.newIndex] = JSON.parse(JSON.stringify(added.element.data))
          break
        default:
      }
    }
    const checkMove = (evt: any) => {
      dragIndex.value = evt.draggedContext.futureIndex

      // 判断是否是 GroupName.Layout（竖线） 还是 GroupName.People（横线）。根据to的宽度和relatedRect.width的宽度比较
      // 10作为一个精度
      const line = evt.to.clientWidth - evt.relatedRect.width > 10 ? 'vertical' : 'horizontal'
      
      draggableHoverStyle.value = line == 'vertical' 
        ? {
          borderLeft: '2px dotted var(--el-color-primary)',
          height: evt.relatedRect.height + 'px',
          width: '2px'
        }
        : {
          borderTop: '2px dotted var(--el-color-primary)',
          height: '2px',
          width: '100%'
        }
        
      return true
    }
    return {
      components,
      GroupName,
      header,
      draggableHoverStyle,
      log,
      checkMove
    }
  }
})
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.left {
  padding: 0 20px;
  > span {
    font-weight: bold;
    color: #333;
    font-size: 14px;
    margin: 20px 0;
    display: inline-block;
  }

  > .left-components {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    > .left-components-item:nth-child(even) {
      margin-left: 15px;
      width: calc(50% - 15px) !important;
    }
    > .left-components-item {
      // 替换样式
      border: none !important;
      width: 50% !important;
      height: auto !important;
      box-sizing: border-box;
      background: #fff;
      color: #666;
      display: flex;
      justify-content: start;
      align-items: center;
      padding: 10px;
      border-radius: 6px;
      font-size: 14px;
      box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, .05);
      margin-bottom: 15px;
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