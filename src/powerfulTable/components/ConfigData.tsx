import { defineComponent, Component, ref, watch } from "vue"
import { data, getCurrentData, header, components, currentAttr } from "@/modules/index"
import { Delete, DocumentCopy } from '@element-plus/icons-vue';
import { PowerfulTableHeaderProps } from 'el-plus-powerful-table-ts/global';
import { BasicsComponentType, OtherComponentsType, GroupName } from '#/enums';
import CodeMirror from '@/components/codemirror/CodeMirror.vue';

export default defineComponent({
  components: {
    CodeMirror,
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
        if (copyHeader.length == 1) data.type = GroupName.Layout
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
    // 插槽数据
    const slots = (name: string, label: string) => ({
      label: () => <span class={tabsValue.value == name ? 'isActive' : ''}>{ label }</span>
    })
    // json编辑区数据
    const codeData = ref("")
    const tabsValue = ref('json')
    // 监听type 改变
    watch(() => data, (val) => {
      codeData.value = JSON.stringify(val.type == GroupName.Layout ? header.value[val.headerIndex] : (header.value[val.headerIndex].props as PowerfulTableHeaderProps[])[val.propsIndex], null, 2)
    }, {
      immediate: true,
      deep: true
    })

    return () => (
      <>
        <div class="right-view-header">
          {/* 左侧文字和图标 */}
          <div style="display: flex; align-items: center;">
            <el-icon style="margin-right: 10px; font-size: 18px">
              { currentAttr.value?.icon }
            </el-icon>
            <b>{currentAttr.value?.label}</b> 
          </div>
          {/* 右侧操作按钮 */}
          {
            data.type !== GroupName.Layout
            ? <div>
              { btnList.map(item => TooltipButton(item)) }
            </div>
            : <span></span>
          }
        </div>
        <el-tabs v-model={tabsValue.value} class="tabs">
          <el-tab-pane name="form" v-slots={slots("form", "表单")}>
            {data.type
            ? 
            <>
              <el-form model={getCurrentData()} label-position="top" class="config-data-form">
                  {
                    data.type === GroupName.Layout
                    ? ""
                    : <components.common />
                  }
                  {
                    { 
                      [OtherComponentsType.Layout]: <components.Layout />,
                      [BasicsComponentType.Btn]: <components.Button />,
                      [BasicsComponentType.Switch]: <components.Switch />,
                      [BasicsComponentType.Input]: <components.Input />,
                      [BasicsComponentType.Image]: <components.Image />,
                      [BasicsComponentType.Textarea]: 'Input',
                      [BasicsComponentType.Iconfont]: <components.Icon />,
                      [BasicsComponentType.Tag]: <components.Tag />,
                      [BasicsComponentType.Rate]: <components.Rate />,
                      [BasicsComponentType.Text]: <components.Text />,
                      [BasicsComponentType.Link]: <components.Link />,
                      [BasicsComponentType.Video]: <components.Video />,
                      'none':'None'
                    }[data.type]
                  }
                </el-form>
              </>
            : <div>0000</div>
          }  
          </el-tab-pane>
          <el-tab-pane name="json" v-slots={slots("json", "JSON")}>
            {/* <el-scrollbar style="height: 100%"> */}
              <CodeMirror
                v-model:value={codeData.value}
                onChange={(str: string) => {
                  try {
                    JSON.parse(str)
                  } catch (err) {
                    console.log('jSON编辑格式有误！');
                    return
                  }
                  
                  switch (data.type) {
                    case GroupName.Layout:
                      header.value[data.headerIndex] = JSON.parse(str)
                      break
                    default:
                      (header.value[data.headerIndex].props as PowerfulTableHeaderProps[])[data.propsIndex] = JSON.parse(str)
                  }
                }}
              ></CodeMirror>
            {/* </el-scrollbar> */}
          </el-tab-pane>
        </el-tabs>
      </>
    )
  }
})