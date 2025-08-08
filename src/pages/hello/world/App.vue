<script setup lang="ts">
const count = ref(0)

function onClick() {
  count.value++
}
</script>

<template>
  <div class="p-4">
    <h2>world</h2>
    <div>
      <a class="text-blue-500 underline" href="../index.html">返回首页</a>
    </div>
    <div>
      <a class="text-blue-500 underline" href="../hello.html">返回hello</a>
    </div>
    <div class="flex items-center gap-2 text-sm mt-8">
      <div class="px-3 py-1 rounded border border-solid border-blue-400 text-blue-500 cursor-pointer select-none" @click="onClick">点击</div>
      <div>{{ count }}</div>
    </div>
  </div>
</template>
