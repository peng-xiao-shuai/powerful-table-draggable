<script lang="tsx">
import { defineComponent, getCurrentInstance } from "vue";
import { MoreFilled, Delete, DocumentCopy } from '@element-plus/icons-vue';
import { header, data } from '@/modules/index';

export default defineComponent({
  props: {
    index: {
      type: Number,
      default: 0
    },
    type: String
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance() as any
    const slots = {
      reference: () => (
        <el-icon class="radius"><MoreFilled /></el-icon>
      )
    }
    return () => (
      <>
        <el-popover v-slots={slots} placement="right" popper-class="popover-more">
            <el-button type="danger" size="small" circle onClick={() => {
              if (props.type === 'layout') {
                if (header.value.length == 1) {
                  proxy.$message.warning('最后一个，不能删除！')
                  return
                }
                if (props.index >= header.value.length - 1) data.headerIndex = props.index - 1
                header.value.splice(props.index, 1)
              }
            }}>
              <el-icon><Delete /></el-icon>
            </el-button>
            <el-button type="primary" size="small" circle onClick={() => {
              if (props.type === 'layout') {
                header.value.push({...header.value[props.index]})
              }
            }}>
              <el-icon><DocumentCopy /></el-icon>
            </el-button>
        </el-popover>
      </>
    )
  }
})
</script>

<style scoped lang="scss">
.radius {
  position: absolute;
  border-radius: 50%;
  padding: 5px;
  top: 0;
  right: 0;
  color: var(--el-color-primary);
  font-size: 16px;
  z-index: 2;
}
</style>