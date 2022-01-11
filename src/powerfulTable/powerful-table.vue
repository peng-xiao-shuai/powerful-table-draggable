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
                name: 'people',
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
        class="dragArea list-group w-full"
        :list="views"
        @change="log"
        :move="checkMove"
        group="people"
      >
        <div
          class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
          v-for="(item, index) in views"
          :key="index"
        >
          <component :is="item.componentName"></component>
        </div>
      </draggable>
    </pane>
    <pane min-size="20" max-size="30">
      <span>1</span>
    </pane>
  </splitpanes>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue';
import { VueDraggableNext } from 'vue-draggable-next'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
export default defineComponent({
  components: {
    Search,
    draggable: VueDraggableNext,
    Splitpanes,
    Pane,
  },
  setup() {
    const components = ref([{
      label: '表格组件',
      list: [
        {
          name: 'Switch', id: 1,
          label: '开关',
          icon: 'Search',
        },
        {
          name: 'Button', id: 2, label: '开关',
          icon: 'Search',
        },
        {
          name: 'Rate', id: 3, label: '开关',
          icon: 'Search',
        }
      ]
    }, {
      label: '表格配置组件',
      list: [
        {
          name: 'Switch', id: 1, label: '开关',
          icon: Search,
        },
        {
          name: 'Button', id: 2, label: '开关',
          icon: Search,
        },
        {
          name: 'Rate', id: 3, label: '开关',
          icon: Search,
        }
      ]
    }])
    // 视图的数据
    const views = ref([{
      componentName: 'el-switch',
      props: {
        value: 1
      }
    }])
    const log = (event: any) => {
      console.log(event)
    }
    const checkMove = (evt: any) => {
      console.log(evt);
      return (evt.draggedContext.element.name !== 'apple');
    }
    return {
      components,
      views,
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