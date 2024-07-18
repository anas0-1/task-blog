<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">{{ post.title }}</h2>
    <p class="mb-4">{{ post.body }}</p>
    <div v-if="post.userId === loggedInUserId">
      <form @submit.prevent="updatePost" class="mb-4 space-y-4">
        <div>
          <label for="title" class="block text-gray-700">Title:</label>
          <input type="text" v-model="post.title" class="mt-1 p-2 w-full border rounded" required />
        </div>
        <div>
          <label for="body" class="block text-gray-700">Body:</label>
          <textarea v-model="post.body" class="mt-1 p-2 w-full border rounded" required></textarea>
        </div>
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded">Update Post</button>
      </form>
      <button @click="deletePost" class="w-full bg-red-600 text-white py-2 rounded">Delete Post</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      post: {},
      loggedInUserId: null
    };
  },
  async created() {
    const postId = this.$route.params.id;
    try {
      const response = await axios.get(`http://localhost:3000/posts/${postId}`);
      this.post = response.data;

      const userResponse = await axios.get('http://localhost:3000/users?isConnected=true');
      if (userResponse.data.length === 1) {
        this.loggedInUserId = userResponse.data[0].id;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    async updatePost() {
      try {
        const response = await axios.put(`http://localhost:3000/posts/${this.post.id}`, this.post);
        this.post = response.data;
      } catch (error) {
        console.error('Error updating post:', error);
      }
    },
    async deletePost() {
      try {
        await axios.delete(`http://localhost:3000/posts/${this.post.id}`);
        this.$router.push('/posts');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  }
};
</script>
