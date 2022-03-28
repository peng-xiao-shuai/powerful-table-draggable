import { QuestionFilled, Plus } from '@element-plus/icons-vue';
import { Component, Ref, ref } from 'vue';
import { PowerfulTableHeader } from 'el-plus-powerful-table-ts/global';
import { BasicsComponentType } from '#/enums';
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
  if (scope.row[prop.prop] == undefined || (scope.row[prop.prop] == null && prop.type != 'btn')) {
    return (
        prop.reserve
        ? <div v-html={prop.reserve}></div>
        : <div><span>暂无数据</span></div>  
    )
  }

  return { 
    [BasicsComponentType.Image]: <p-t-image { ...bindProp } />,
    [BasicsComponentType.Btn]: <p-t-button { ...bindProp } />,
    [BasicsComponentType.Switch]: <p-t-switch { ...bindProp } />,
    [BasicsComponentType.Input]: <p-t-input { ...bindProp } />,
    [BasicsComponentType.Text]: <p-t-text  { ...bindProp }/>,
    [BasicsComponentType.Textarea]: <p-t-input { ...bindProp }/>,
    [BasicsComponentType.Iconfont]: <p-t-icon { ...bindProp } />,
    [BasicsComponentType.Tag]: <p-t-tags { ...bindProp } />,
    [BasicsComponentType.Rate]: <p-t-rate { ...bindProp } />,
    [BasicsComponentType.Link]: <p-t-link { ...bindProp } />,
    [BasicsComponentType.Video]: <p-t-video { ...bindProp } />
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
 export const FormItemLabelAdd = (label: string, type: string, fun: Function, element?: JSX.Element) => {
   const status = ref(false)
   const value = ref('')
   const node = ref<undefined| JSX.Element>(element)
   switch (type) {
    case 'color':
      value.value = '#F7BA2A'
      node.value = <el-color-picker size="small" v-model={value.value} onChange={() => fun(value.value)} />
      break;
    case 'input':
      // node.value = <el-input style="flex: 1" v-model={value.value} size="small" onKeyDown={(e: any) =>{e.keycode === 13 && fun(value.value)}}
      //   onBlur={
      //     () => {
      //       console.log('失去焦点');
            
      //     }
      //   } />
      break;
   }
   return {
    label: () => (
      <div style="display: flex">
        <div style="margin-right: 10px">{ label }</div>
        {
          status.value
          ? node.value
          : <el-button onClick={() => status.value = true} type="primary" size="small" icon={<Plus />} />
        }
      </div>
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