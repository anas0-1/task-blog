<template>
  <div>
    <AppNavbar />
    <div class="container mx-auto p-6">
      <h2 class="text-3xl font-bold mb-8 text-center">Todo List</h2>

      <!-- Form to create new todo -->
      <div class="max-w-lg mx-auto mb-8">
        <form @submit.prevent="createTodo" class="bg-white p-6 rounded-lg shadow-md space-y-6">
          <h3 class="text-2xl font-semibold mb-4">Create New Todo</h3>
          <div>
            <label for="title" class="block text-gray-700">Title:</label>
            <input type="text" v-model="newTodo.title" class="mt-1 p-2 w-full border rounded" required />
          </div>
          <div>
            <label for="description" class="block text-gray-700">Description:</label>
            <textarea v-model="newTodo.description" class="mt-1 p-2 w-full border rounded" required></textarea>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create Todo</button>
        </form>
      </div>

      <!-- List of todos -->
      <ul class="space-y-6">
        <li v-for="todo in todos" :key="todo.id" class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="text-xl font-semibold text-blue-600 hover:underline cursor-pointer" @click="viewTodoDetail(todo.id)">{{ todo.title }}</h4>
              <p class="text-gray-700">{{ todo.description }}</p>
            </div>
            <div v-if="todo.userId === loggedInUserId">
              <button @click="editTodo(todo)" class="bg-yellow-400 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-500">Edit</button>
              <button @click="deleteTodo(todo.id)" class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        </li>
      </ul>

      <!-- Modal for updating todo -->
      <Modal v-if="isModalOpen" @close="closeModal">
        <form @submit.prevent="updateTodo" class="space-y-6 p-6">
          <h3 class="text-2xl font-semibold mb-4">Edit Todo</h3>
          <div>
            <label for="title" class="block text-gray-700">Title:</label>
            <input type="text" v-model="currentTodo.title" class="mt-1 p-2 w-full border rounded" required />
          </div>
          <div>
            <label for="description" class="block text-gray-700">Description:</label>
            <textarea v-model="currentTodo.description" class="mt-1 p-2 w-full border rounded" required></textarea>
          </div>
          <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Update Todo</button>
        </form>
      </Modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from './Modal.vue';
import AppNavbar from './AppNavbar.vue';

export default {
  components: {
    Modal,
    AppNavbar
  },
  data() {
    return {
      todos: [],
      newTodo: {
        title: '',
        description: '',
        userId: null
      },
      currentTodo: {},
      isModalOpen: false,
      loggedInUserId: null
    };
  },
  async created() {
    this.loggedInUserId = localStorage.getItem('loggedInUserId');
    try {
      const response = await axios.get(`http://localhost:3000/todos?userId=${this.loggedInUserId}`);
      this.todos = response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  },
  methods: {
    async createTodo() {
      this.newTodo.userId = this.loggedInUserId;
      try {
        const response = await axios.post('http://localhost:3000/todos', this.newTodo);
        this.todos.push(response.data);
        this.newTodo.title = '';
        this.newTodo.description = '';
      } catch (error) {
        console.error('Error creating todo:', error);
      }
    },
    async deleteTodo(todoId) {
      try {
        await axios.delete(`http://localhost:3000/todos/${todoId}`);
        this.todos = this.todos.filter(todo => todo.id !== todoId);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    },
    editTodo(todo) {
      if (todo.userId === this.loggedInUserId) {
        this.currentTodo = { ...todo };
        this.isModalOpen = true;
      } else {
        console.error('You do not have permission to edit this todo.');
      }
    },
    async updateTodo() {
      try {
        const response = await axios.put(`http://localhost:3000/todos/${this.currentTodo.id}`, this.currentTodo);
        const index = this.todos.findIndex(todo => todo.id === this.currentTodo.id);
        this.$set(this.todos, index, response.data);
        this.closeModal(); // Close the modal after updating the todo
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
    viewTodoDetail(todoId) {
      this.$router.push(`/todos/${todoId}`);
    },
    closeModal() {
      this.isModalOpen = false;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

h2, h3 {
  color: #2c3e50;
}

form label {
  font-weight: 600;
}

form input, form textarea {
  background-color: #f9fafb;
}

form button {
  transition: background-color 0.3s ease;
}

ul li {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

ul li:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  filter: brightness(1.1);
}
</style>
