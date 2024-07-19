<template>
  <div>
    <AppNavbar />
    <div class="container mx-auto p-6">
      <div v-if="todo">
        <h2 class="text-3xl font-bold mb-4">{{ todo.title }}</h2>
        <p class="text-gray-700 mb-4">{{ todo.description }}</p>
        <router-link to="/todos" class="text-blue-600 hover:underline">Back to Todo List</router-link>
      </div>
      <div v-else>
        <p class="text-red-500">Todo not found.</p>
        <router-link to="/todos" class="text-blue-600 hover:underline">Back to Todo List</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppNavbar from './AppNavbar.vue';

export default {
  components: {
    AppNavbar
  },
  data() {
    return {
      todo: null
    };
  },
  async created() {
    const todoId = this.$route.params.id;
    try {
      const response = await axios.get(`http://localhost:3000/todos/${todoId}`);
      this.todo = response.data;
    } catch (error) {
      console.error('Error fetching todo:', error);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  color: #2c3e50;
}
</style>
