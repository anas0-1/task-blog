<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="name" class="block text-gray-700">Name:</label>
          <input type="text" v-model="name" class="mt-1 p-2 w-full border rounded" required />
        </div>
        <div>
          <label for="password" class="block text-gray-700">Password:</label>
          <input type="password" v-model="password" class="mt-1 p-2 w-full border rounded" required />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
      <router-link to="/register" class="block text-blue-600 mt-4 text-center">Don't have an account? Register here.</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.get(`http://localhost:3000/users?name=${this.name}&password=${this.password}`);
        if (response.data.length === 1) {
          const user = response.data[0];
          // Update user's isConnected field
          user.isConnected = true;
          // Update user data in the backend
          await axios.put(`http://localhost:3000/users/${user.id}`, user);
          // Store userId in localStorage for session management
          localStorage.setItem('loggedInUserId', user.id);
          // Navigate to /posts route after successful login
          this.$router.push('/posts'); // Ensure this line is executing
        } else {
          console.error('Invalid credentials');
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
};
</script>
