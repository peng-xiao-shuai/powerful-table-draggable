import Input from '../powerfulTable/components/input';
import Button from '../powerfulTable/components/button';
import Image from '../powerfulTable/components/image';
import Switch from '../powerfulTable/components/switch';
import Icon from '../powerfulTable/components/icon';
import Tags from '../powerfulTable/components/tags';
import Rate from '../powerfulTable/components/rate';
import { QuestionFilled, Plus } from '@element-plus/icons-vue';
import { PowerfulTableHeader } from 'el-plus-powerful-table-ts';
import { Component, ref } from 'vue';
/**
 * 匹配组件
 * @param {string} type 类型
 * @returns 组件名称
 */
export const matchComponents = (type: string = 'text', scope: any, prop: any, item: PowerfulTableHeader) => {
  const bindProp = {
    row: scope.row,
    index: scope.$index,
    prop,
    aligning: item.headerAlign || 'center',
  }
  
  return { 
    'image': <Image { ...bindProp } />,
    'btn': <Button { ...bindProp } />,
    'switch': <Switch { ...bindProp } />,
    'input': <Input { ...bindProp } />,
    'text': <>文本</>,
    'textarea': 'Input',
    'iconfont': <Icon { ...bindProp } />,
    'tag': <Tags { ...bindProp } />,
    'rate': <Rate { ...bindProp } />,
    'href': 'Link',
    'video': 'Video',
    'layout':'layout'
  }[type]
}

/**
 * 自定义表单label提示
 */
export const FormItemLabelToolTip = (label: string, content: string, placement: string = 'bottom') => ({
  label: () => (
    <>
      <span>{ label }</span>
      <el-tooltip class="tooltip" effect="dark" content={content} placement={placement}>
        <el-icon><QuestionFilled /></el-icon>
      </el-tooltip>
    </>
  )
})

/**
 * 自定义表单label新增
 */
 export const FormItemLabelAdd = (label: string, type: string, fun: Function) => {
   const status = ref(false)
   const value = ref('#F7BA2A')
   const node = ref<null| JSX.Element>(null)
   switch (type) {
    case 'color':
      node.value = <el-color-picker size="small" v-model={value.value} onChange={() => fun(value.value)} />
      break;
    case 'input':
      value.value = ''
      node.value = <el-input v-model={value.value} size="small" onKeyDown={(e: any) =>{e.keycode === 13 && fun(value.value)}} onBlur={() => value.value != '' && fun(value.value)} />
      break;
   }
   return {
    label: () => (
      <>
        <span>{ label }</span>
        {
          status.value
          ? node.value
          : <el-button onClick={() => status.value = true} type="primary" size="small" icon={<Plus />} />
        }
      </>
    )
  }
}

/**
 * 视图左侧icon
 */
 export const leftRenderIcon = (icon: Component) => (
  <>
    <el-icon style="margin-right: 5px">
      { icon }
    </el-icon>
  </>
)