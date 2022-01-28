import { Component } from 'vue';
/**
 * 
 * @param label 名称
 * @param componentName 动态组件名称
 * @param icon 图标
 * @returns 
 */
export const createAttr = <D = any>( label: string, type: string, icon: Component | string, data: D) => {
  return {
    label,
    type,
    icon,
    data
  }
}