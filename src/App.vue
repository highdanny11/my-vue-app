<template>
  <div class="test">
    <img :src="imgData" alt="">
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import pdfRender from '@/utils/pdfRender'
import { onMounted, ref } from 'vue'
const imgData = ref('')



onMounted(async () => {
  const res = await pdfRender()
  imgData.value = res
  console.log(res)
})
</script>

<style scoped>
.test {
  color: red;
}
</style>
