<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded shadow-lg w-full max-w-md">
      <button class="absolute top-0 right-0 m-4 text-gray-500" @click="$emit('close')">&times;</button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal'
};
</script>

<style scoped>
/* Add styles here */
</style>
