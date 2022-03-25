import { componentAttr } from '#/modules';
import { createAttr } from '@/utils/index';
import { BtnDataType, PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts/global';
import { getCurrentData, data } from "@/modules/index"
import { defineComponent, Ref, ref, watch } from 'vue';
import { themeOptions } from '@/modules/dict';
import { FormItemLabelToolTip } from '@/components/common';
import { Plus, ArrowLeftBold, ArrowRightBold, Files } from '@element-plus/icons-vue';
const defineBtnData: BtnDataType = {
  tip: '',
  icon: '',
  disabled: false,
  text: '按 钮',
  isMore: false,
  type: 'primary',
  // showBtn: ((row: any, index: number) => boolean) | boolean,
  // emit: EmitType,
  isTooltip: false,
  params: {}
}

export const attr: componentAttr<BtnDataType[]> = createAttr<BtnDataType[]>('按钮', 'btn', <Files />, [defineBtnData])

export default defineComponent({
  setup() {
    // data的下标
    const dataIndex = ref(0)
    // data中某一项为数组时的下标
    const moreIndex = ref(0)

    // 切换更改 下标
    watch([data, dataIndex], () => {
      moreIndex.value = 0
    }, {
      deep: true
    })

    const getData = () => (getCurrentData<PowerfulTableHeaderProps<any, BtnDataType[] | any>>())
    const getFormData = () => (
      !Array.isArray(getData().data[dataIndex.value])
        ? getData().data[dataIndex.value] as BtnDataType
        : getData().data[dataIndex.value][moreIndex.value] as BtnDataType
    )

    // 切换下标
    const nextIndexFun = (type: 'next' | 'up' = 'next', index: Ref<number>, length: number) => {
      console.log(getFormData().isMore ,Array.isArray(getData().data[dataIndex.value]));
      
      if (type === 'next') {
        length == index.value ? index.value = 0 : index.value++
      } else {
        0 == index.value ? index.value = length : index.value--
      }
    }

    return () => (
      <>
        <div class="grid grid-c-2">
          <el-form-item v-slots={FormItemLabelToolTip('按钮文字', '不传默认提示文字')}>
            <el-input clearable v-model={getFormData().text}></el-input>
          </el-form-item>
          <el-form-item label='提示文字'>
            <el-input clearable v-model={getFormData().tip}></el-input>
          </el-form-item>
        </div>
        <div class="grid grid-c-2">
          <el-form-item label='显示 tooltip 提示'>
            <el-switch active-text="是" inactive-text="否" inline-prompt v-model={getFormData().isTooltip}></el-switch>
          </el-form-item>
          {
            moreIndex.value == 0
             ? <el-form-item label='是否按钮为更多'>
                <el-switch active-text="是" inactive-text="否" inline-prompt v-model={getFormData().isMore} onChange={(e: boolean) => {
                  const data: BtnDataType = getData().data[dataIndex.value]
                  if (e) {
                    moreIndex.value = 0
                    getData().data[dataIndex.value] = [{...data}]
                  } else {
                    // es6 二维数组转一维数组
                    moreIndex.value = -1
                    getData().data = getData().data.flat()
                  }
                }}></el-switch>
              </el-form-item>
            : ''
          }
        </div>
        <div class="grid grid-c-2">
          <el-form-item label='按钮类型'>
            <el-select v-model={getFormData().type}>
              {themeOptions.map(option => (
                <el-option label={option.label} key={option.label} value={option.value}></el-option>
              ))}
            </el-select>
          </el-form-item>
          <el-form-item label='新增按钮'>
            <el-button type="primary" icon={Plus} onClick={() => {
              getData().data.push({...defineBtnData})
              dataIndex.value++
            }}></el-button>
            {
              getFormData().isMore || Array.isArray(getData().data[dataIndex.value])
                ? <el-button type="primary" onClick={() => {
                  getData().data[dataIndex.value].push({...defineBtnData})
                }}>新增子集按钮</el-button>
                : ''
            }
          </el-form-item>
        </div>
        <div class="grid grid-c-2">
          <el-form-item label='切换按钮'>
            <el-button type="success" onClick={() => nextIndexFun('up', dataIndex, getData().data.length - 1)} icon={ArrowLeftBold}></el-button>
            <el-button type="success" onClick={() => nextIndexFun('next', dataIndex, getData().data.length - 1)} icon={ArrowRightBold}></el-button>
          </el-form-item>
          {
              getFormData().isMore || Array.isArray(getData().data[dataIndex.value])
                ? <el-form-item label='切换子集按钮'>
                    <el-button type="warning" onClick={() => nextIndexFun('up', moreIndex, getData().data[dataIndex.value].length - 1)} icon={ArrowLeftBold}></el-button>
                    <el-button type="warning" onClick={() => nextIndexFun('next', moreIndex, getData().data[dataIndex.value].length - 1)} icon={ArrowRightBold}></el-button>
                  </el-form-item>
                : ''
            }
        </div>
      </>
    )
  }
})