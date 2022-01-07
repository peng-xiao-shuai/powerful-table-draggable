<template>
  <splitpanes class="default-theme" style="height: 600px">
    <pane min-size="20" max-size="20">
      <draggable class="dragArea list-group w-full" :list="components" @change="log" :move="checkMove"
        :group="{
          name: 'people',
          pull: 'clone',
          put: false,
        }"
      >
        <div
          class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
          v-for="element in components"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </draggable>
    </pane>
    <pane min-size="50">
      <splitpanes class="default-theme" horizontal style="height: 100%">
        <pane>
          <draggable class="dragArea list-group w-full" :list="views" @change="log" :move="checkMove"
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
        <pane>
          <span>1</span>
        </pane>
      </splitpanes>
    </pane>
    <pane min-size="20" max-size="30">
      <span>1</span>
    </pane>
  </splitpanes>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import Button from './components/button';
import Switch from './components/switch';
import Rate from './components/rate';
export default defineComponent({
  components: {
    draggable: VueDraggableNext,
    Splitpanes,
    Pane,
    Button,
    Switch,
    Rate
  },
  setup() {
    const components = ref([
      { name: 'Switch', id: 1, props: {

      }},
      { name: 'Button', id: 2 },
      { name: 'Rate', id: 3 }
    ])
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
      return (evt.draggedContext.element.name!=='apple');
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
.splitpanes__splitter {
  
}
</style>