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
          ? <el-form model={getCurrentData()}>
              {
                { 
                  'layout': <components.Layout></components.Layout>,
                  'btn': 'Button',
                  'switch': 'Switch',
                  'input': <components.Input></components.Input>,
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