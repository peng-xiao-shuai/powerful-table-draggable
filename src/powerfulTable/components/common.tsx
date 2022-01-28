import { data } from '@/modules/index';
import { Type } from 'el-plus-powerful-table-ts';
import Input from './input';
import Button from './button';
/**
 * 匹配组件
 * @param {string} type 类型
 * @returns 组件名称
 */
export const matchComponents = (type: string = 'text', scope: any, prop: any, props: any) => {
  const bindProp = {
    row: scope.row,
    index: scope.$index,
    prop,
    aligning: props.item.headerAlign || 'center',
  }
  
  return { 
    'image': 'Image',
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