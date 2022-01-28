import { reactive, ref } from 'vue';
import { PowerfulTableHeader, PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts';
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
// 主视图渲染所需配置数据 并且右侧参数视图直接修改此变量
const header = ref<PowerfulTableHeader[]>([])
// 右侧视图参数配置，数据由 header 提供
const data = reactive<{
  headerIndex: number,
  propsIndex: number,
  // TODO 待完善
  type?: string
}>({
  headerIndex: 0,
  propsIndex: 0,
  type: undefined
})

// 所有 default 导出的 tsx
const components: {[k:string]: any} = {}

const getCurrentData = (): PowerfulTableHeader | PowerfulTableHeaderProps => {
  return data.type == 'layout' ? header.value[data.headerIndex] : (header.value[data.headerIndex].props as any[])[data.propsIndex]
}

const setAttrs = (source: BasicsComponents, label: string, group: string = GroupName.People) => {
  const attrs: componentAttr[] = []
  Object.keys(source).forEach(modulePath => {
    const moduleName = modulePath.replace(/^\.\/.*\/(.*)\.\w+$/, '$1')
    components[moduleName] = source[modulePath].default
    
    attrs.push(source[modulePath].attr)
  })
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
  getCurrentData
}