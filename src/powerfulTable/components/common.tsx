import Input from './input';
import Button from './button';
import Image from './image';
import { QuestionFilled } from '@element-plus/icons-vue';
import { PowerfulTableHeader } from 'el-plus-powerful-table-ts';
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
    'image': <Image { ...bindProp }></Image>,
    'btn': <Button { ...bindProp }></Button>,
    'switch': 'Switch',
    'input': <Input { ...bindProp }></Input>,
    'text': <>文本</>,
    'textarea': 'Input',
    'iconfont': 'Icon',
    'tag': 'Tags',
    'rate': 'Rate',
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