<template>
    <div class="absolute inset-0 bg-stone-300 opacity-50"></div>
    <div class="relative z-10">
      <router-view />
    </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* Global styles */
body {
  margin: 0;
  font-family: 'Inter', sans-serif; /* Example font; include in your index.html or import in main.js */
  color: #333;
}

html, body, #app {
  height: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
