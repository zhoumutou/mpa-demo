<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const date = ref('')

function onClick() {
  const message = 'hi mpa'
  ElMessage.success(message)
}
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="p-4 flex flex-col gap-4">
      <h2 class="font-bold text-2xl">MPA Demo</h2>
      <div class="flex flex-col gap-4">
        <!-- 页面链接 -->
        <div>
          <h3 class="font-medium text-base">页面链接</h3>
          <div class="flex flex-col gap-2 text-base font-semibold">
            <div>
              <el-link href="./hello.html" type="primary" underline="always">hello</el-link>
            </div>
            <div>
              <el-link href="./hello/world.html" type="primary" underline="always">world</el-link>
            </div>
          </div>
        </div>

        <!-- 组件展示 -->
        <div class="flex flex-col gap-4">
          <h3 class="font-medium text-base">组件展示</h3>
          <div class="flex flex-col gap-4">
            <div>
              <el-button type="primary" @click="onClick">Primary</el-button>
            </div>
            <div>
              <el-date-picker v-model="date" type="date" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-config-provider>
</template>
