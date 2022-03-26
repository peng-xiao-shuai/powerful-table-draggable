/**
 * 字典
 */

/**
 * 转换options
 * @param labels label名称数组
 * @param values 数据数组
 * @returns {label: string, value: any}
 */
const optionsFun = (labels: string[], values?: (number|string|boolean|undefined)[]) => labels.map((item, index) => ({ label: item, value: values ? values[index] : item }))

// 排序
export const sortableOptions = optionsFun(['排序', '不排序', '自定义'], [true, false, 'custom'])
// 固定
export const fixedOptions = optionsFun(['不固定', '固定左侧', '固定右侧'], [false, 'left', 'right'])
// 显示提示
export const overflowTooltipOption = optionsFun(['显示提示', '不显示提示'], [true, false])
// 输入框插槽方向
export const inputSlotDirection = optionsFun(['前置', '后置', '不显示插槽'], ['prepend', 'append', undefined])
// 禁用
export const disabledOptions = optionsFun(['禁用', '不禁用'], [true, false])
// 对齐方式
export const alignOptions = optionsFun(['居左', '居中', '居右'], ['left', 'center', 'right'])
// 主题
export const themeOptions = optionsFun(['默认', '成功', '警告', '危险', '信息', '文本'], ['primary', 'success', 'warning', 'danger', 'info', 'text'])
// 图片填充方式
export const imageFitOption = optionsFun(['fill', 'contain', 'cover', 'none', 'scale-down'])
// target
export const targetOption = optionsFun(['_self', '_blank', '_parent', '_top'])
// tag主题类型
export const tagThemeOption = optionsFun(['dark', 'light', 'plain'])