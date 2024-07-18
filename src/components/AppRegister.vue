<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-4">Register</h2>
      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label for="name" class="block text-gray-700">Name:</label>
          <input type="text" v-model="name" class="mt-1 p-2 w-full border rounded" required />
        </div>
        <div>
          <label for="password" class="block text-gray-700">Password:</label>
          <input type="password" v-model="password" class="mt-1 p-2 w-full border rounded" required />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Register</button>
      </form>
      <router-link to="/login" class="block text-blue-600 mt-4 text-center">Already have an account? Login here.</router-link>
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
    async register() {
      try {
        await axios.post('http://localhost:3000/users', {
          name: this.name,
          password: this.password,
          isConnected: false
        });
        this.$router.push('/login');
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  }
};
</script>
