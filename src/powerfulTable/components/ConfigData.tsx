import { defineComponent, watch } from "vue"
import { data, getCurrentData, components } from "@/modules/index"

export default defineComponent({
  components: {
    ...components
  },
  setup() {
    watch(data, val => {
      console.log(data);
    }, {
      deep: true
    })
    return () => (
      <>
        {data.type
          ? <el-form model={getCurrentData()} label-position='top' class="config-data-form">
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
          : <div>0000</div>
        }
      </>
    )
  }
})