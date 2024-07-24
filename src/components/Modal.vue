<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-1/2">
      <div class="flex justify-end">
        <button @click="$emit('close')" class="text-gray-600 hover:text-gray-900">&times;</button>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
};
</script>

<style scoped>
</style>
