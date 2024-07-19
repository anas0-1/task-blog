<template>
      <AppNavbar />
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-4">User Details</h2>
      <form @submit.prevent="updateUser" class="space-y-4">
        <div>
          <label for="name" class="block text-gray-700">Name:</label>
          <input type="text" v-model="user.name" class="mt-1 p-2 w-full border rounded" required />
        </div>
        <div>
          <label for="password" class="block text-gray-700">Password:</label>
          <input type="password" v-model="user.password" class="mt-1 p-2 w-full border rounded" required />
        </div>
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded">Update</button>
      </form>
      <button @click="deleteUser" class="w-full bg-red-600 text-white py-2 rounded mt-4">Delete Account</button>
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
      user: {
        name: '',
        password: ''
      }
    };
  },
  async created() {
    const userId = localStorage.getItem('loggedInUserId');
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  },
  methods: {
    async updateUser() {
      const userId = localStorage.getItem('loggedInUserId');
      try {
        await axios.put(`http://localhost:3000/users/${userId}`, this.user);
        // Clear loggedInUserId from localStorage and redirect to login page
        localStorage.removeItem('loggedInUserId');
        localStorage.setItem('isConnected', 'false');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error updating user details:', error);
      }
    },
    async deleteUser() {
      const userId = localStorage.getItem('loggedInUserId');
      try {
        await axios.delete(`http://localhost:3000/users/${userId}`);
        // Clear loggedInUserId from localStorage and redirect to login page
        localStorage.removeItem('loggedInUserId');
        localStorage.setItem('isConnected', 'false');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Tailwind CSS styles can be added here */
</style>
