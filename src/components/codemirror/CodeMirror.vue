<template>
  <div class="editor" ref="el"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect, watch, unref, nextTick, PropType } from 'vue';
import CodeMirror from 'codemirror';
import { MODE } from './codeMirror';
// css
import './codemirror.css';
import 'codemirror/theme/idea.css';
// modes
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';

const props = defineProps({
  mode: {
    type: String as PropType<MODE>,
    default: MODE.JSON,
    validator(value: any) {
      // 这个值必须匹配下列字符串中的一个
      return Object.values(MODE).includes(value);
    },
  },
  value: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
});

const emit = defineEmits(['change']);

const el = ref();
let editor: CodeMirror.Editor | null

watch(
  () => props.value,
  async (value) => {
    await nextTick();
    const oldValue = editor?.getValue();
    if (value !== oldValue) {
      editor?.setValue(value ? value : '');
    }
  },
  { flush: 'post' },
);

watchEffect(() => {
  editor?.setOption('mode', props.mode);
});

const setTheme = () => {
  editor?.setOption(
    'theme',
    'idea'
  );
}

async function init() {
  const addonOptions = {
    autoCloseBrackets: true,
    autoCloseTags: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers'],
  };

  editor = CodeMirror(el.value!, {
    value: '',
    mode: props.mode,
    readOnly: props.readonly,
    tabSize: 2,
    theme: 'mdn-like',
    lineWrapping: true,
    lineNumbers: true,
    ...addonOptions,
  });
  editor?.setValue(props.value);
  setTheme();
  editor?.on('change', () => {
    emit('change', editor?.getValue());
  });
}

onMounted(async () => {
  await nextTick();
  init();
});
</script>
