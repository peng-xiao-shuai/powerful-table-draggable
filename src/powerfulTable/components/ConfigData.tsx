import { defineComponent, Component, watch } from "vue"
import { data, getCurrentData, header, components, currentAttr } from "@/modules/index"
import { Delete, DocumentCopy } from '@element-plus/icons-vue';
import { PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts';

export default defineComponent({
  components: {
    ...components
  },
  setup() {
    const btnList = [{
      title: '复制',
      type: 'primary',
      icon: DocumentCopy,
      click: () => {
        const copyHeader = header.value[data.headerIndex].props as PowerfulTableHeaderProps[]
        copyHeader.push(JSON.parse(JSON.stringify(copyHeader[data.propsIndex])))
      }
    },{
      title: '删除',
      type: 'danger',
      icon: Delete,
      click: () => {
        const copyHeader = header.value[data.headerIndex].props as PowerfulTableHeaderProps[]
        if (data.propsIndex >= copyHeader.length - 1) data.propsIndex = data.propsIndex - 1
        // 没有一个子元素则退回到layout
        if (copyHeader.length == 1) data.type = 'layout'
        copyHeader.splice(data.propsIndex, 1)
      }
    }]
    const TooltipButton = ({title, icon, type, click}: {title: string, icon: Component,  type: string, click: Function}) => (
      <>
        <el-tooltip
          effect="dark"
          content={title}
          placement="bottom"
        >
          <el-button icon={icon} type={type} size="small" onClick={click}></el-button>
        </el-tooltip>
      </>
    )
    return () => (
      <>
        {data.type
          ? 
          <>
            <div style="background: #fff; padding: 10px; display: flex;justify-content: space-between; align-items: center;">
              <b>{currentAttr.value?.label}</b> 
              {
                data.type !== 'layout'
                ? <div>
                  { btnList.map(item => TooltipButton(item)) }
                </div>
                : <span></span>
              }
            </div>
            <el-form model={getCurrentData()} label-position='top' class="config-data-form">
                {
                  data.type === 'layout'
                  ? ""
                  : <components.common></components.common>
                }
                {
                  { 
                    'layout': <components.Layout></components.Layout>,
                    'btn': <components.Button></components.Button>,
                    'switch': 'Switch',
                    'input': <components.Input></components.Input>,
                    'image': <components.Image></components.Image>,
                    'textarea': 'Input',
                    'iconfont': 'Icon',
                    'tag': 'Tags',
                    'rate': 'Rate',
                    'text': <components.Text></components.Text>,
                    'href': 'Link',
                    'video': 'Video',
                    'none':'None'
                  }[data.type]
                }
              </el-form>
            </>
          : <div>0000</div>
        }
      </>
    )
  }
})