<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <router-link to="/posts" class="text-white mr-4">Posts</router-link>
        <router-link to="/todos" class="text-white mr-4">Todos</router-link>
        <router-link to="/user" class="text-white">User</router-link>
      </div>
      <button @click="logout" class="text-white">Logout</button>
    </div>
  </nav>
</template>

<script>export default {
  name: 'AppNavbar',
  methods: {
    logout() {
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      if (loggedInUserId) {
        // Clear loggedInUserId from localStorage
        localStorage.removeItem('loggedInUserId');
        console.log('User logged out successfully.');
        // Redirect to login page or any other page
        this.$router.push('/login');
      }
    }
 }
}
</script>

<style scoped>
/* Add styles here */
</style>
