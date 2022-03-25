import { reactive, ref, computed } from 'vue';
import { PowerfulTableHeader } from 'el-plus-powerful-table-ts/global';
import { componentAttr } from '#/modules';
type BasicsComponents = {
  attr?: componentAttr,
  [k: string]: any
}

type ListComponent = {
  label: string;
  list: componentAttr[];
  [k: string]: any
}

enum GroupName {
  Layout = 'layout',
  People = 'people'
}

// 获取所有的基础组件文件
const basicsComponents: BasicsComponents = import.meta.globEager('./BasicsComponents/**.tsx')
// 获取所有的其他组件文件
const otherComponents: BasicsComponents = import.meta.globEager('./OtherComponents/**.tsx')

// 左侧视图组件数据
const listComponent: ListComponent[] = []
// 所有左侧组件
let attrsLists: componentAttr[] = []
// 主视图渲染所需配置数据 并且右侧参数视图直接修改此变量
const header = ref<PowerfulTableHeader[]>([{
  fixed: false,
  sortable: false,
  headerAlign: 'center',
  overflowTooltip: false,
  props: [],
  label: '布局容器',
  minWidth: 80,
  width: 100
}])
// 右侧视图参数配置，数据由 header 提供
const data = reactive<{
  headerIndex: number,
  propsIndex: number,
  // TODO 待完善
  type?: string
}>({
  headerIndex: 0,
  propsIndex: 0,
  type: 'layout'
})
// 辅助数据
const currentAttr = computed(() => {
  return attrsLists.find(item => item.type == data.type)
})

// 所有 default 导出的 tsx
const components: {[k:string]: any} = {}

const getCurrentData = <T = PowerfulTableHeader>(): T => {
  return data.type == 'layout' ? header.value[data.headerIndex] : (header.value[data.headerIndex].props as any[])[data.propsIndex]
}

const setAttrs = (source: BasicsComponents, label: string, group: GroupName = GroupName.People) => {
  const attrs: componentAttr[] = []
  Object.keys(source).forEach(modulePath => {
    const moduleName = modulePath.replace(/^\.\/.*\/(.*)\.\w+$/, '$1')
    components[moduleName] = source[modulePath].default
    
    // 部分文件里面没有attr 列入 common.tsx
    source[modulePath].attr && attrs.push(source[modulePath].attr)
  })
  attrsLists = attrsLists.concat(attrs)
  listComponent.push({
    label,
    group,
    list: attrs 
  })
}

setAttrs(basicsComponents, '基础组件', GroupName.Layout)
setAttrs(otherComponents, '其他组件')

export {
  GroupName,
  listComponent,
  header,
  data,
  components,
  currentAttr,
  getCurrentData
}