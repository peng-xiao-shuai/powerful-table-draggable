<template>
  <div class="app-container">
    <powerful-table>
    </powerful-table>
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted, defineComponent, nextTick } from "vue"
import powerfulTable from './powerfulTable/index';

export default defineComponent({
  components: {
    powerfulTable
  },
  setup (props, context) {
 
    return {
   
    }
  },
})
</script>
