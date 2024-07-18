<template>
  <div>
    <!-- Navbar component -->
    <AppNavbar />

    <!-- Title -->
    <h2 class="text-2xl font-bold mb-4">Posts</h2>

    <!-- Form to create new post -->
    <form @submit.prevent="createPost" class="mb-4 space-y-4">
      <div>
        <label for="title" class="block text-gray-700">Title:</label>
        <input type="text" v-model="newPost.title" class="mt-1 p-2 w-full border rounded" required />
      </div>
      <div>
        <label for="body" class="block text-gray-700">Body:</label>
        <textarea v-model="newPost.body" class="mt-1 p-2 w-full border rounded" required></textarea>
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Create Post</button>
    </form>

    <!-- List of posts -->
    <ul class="space-y-4">
      <li v-for="post in posts" :key="post.id" class="p-4 bg-white rounded shadow">
        <!-- Title with link to edit modal -->
        <a @click="editPost(post)" class="text-blue-600 hover:underline cursor-pointer">{{ post.title }}</a>
        
        <!-- Body -->
        <p>{{ post.body }}</p>
        
        <!-- Delete button (visible if current user owns the post) -->
        <div v-if="post.userId === loggedInUserId">
          <button @click="deletePost(post.id)" class="bg-red-600 text-white py-1 px-2 rounded mt-2">Delete</button>
        </div>
      </li>
    </ul>

    <!-- Modal for updating post -->
    <Modal v-if="isModalOpen" @close="isModalOpen = false">
      <form @submit.prevent="updatePost" class="space-y-4">
        <div>
          <label for="title" class="block text-gray-700">Title:</label>
          <input type="text" v-model="currentPost.title" class="mt-1 p-2 w-full border rounded" required />
        </div>
        <div>
          <label for="body" class="block text-gray-700">Body:</label>
          <textarea v-model="currentPost.body" class="mt-1 p-2 w-full border rounded" required></textarea>
        </div>
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded">Update Post</button>
      </form>
    </Modal>
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
      posts: [],
      newPost: {
        title: '',
        body: '',
        userId: null // Will be assigned when creating a new post
      },
      currentPost: {},
      isModalOpen: false,
      loggedInUserId: null // Initialize loggedInUserId from localStorage
    };
  },
  async created() {
    this.loggedInUserId = localStorage.getItem('loggedInUserId');

    try {
      const response = await axios.get('http://localhost:3000/posts');
      this.posts = response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  },
  methods: {
    async createPost() {
      // Assign logged-in user's ID to newPost
      this.newPost.userId = this.loggedInUserId;
      try {
        // Send POST request to create a new post
        const response = await axios.post('http://localhost:3000/posts', this.newPost);
        this.posts.push(response.data); // Add new post to local array
        this.newPost.title = ''; // Clear form fields
        this.newPost.body = '';
      } catch (error) {
        console.error('Error creating post:', error);
      }
    },
    async deletePost(postId) {
      try {
        // Send DELETE request to remove post by ID
        await axios.delete(`http://localhost:3000/posts/${postId}`);
        // Update local posts array (remove deleted post)
        this.posts = this.posts.filter(post => post.id !== postId);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    },
    editPost(post) {
      // Copy post data to currentPost for editing
      this.currentPost = { ...post };
      this.isModalOpen = true; // Open modal for editing
    },
    async updatePost() {
      try {
        // Send PUT request to update post by ID
        const response = await axios.put(`http://localhost:3000/posts/${this.currentPost.id}`, this.currentPost);
        // Update local posts array with updated post data
        const index = this.posts.findIndex(post => post.id === this.currentPost.id);
        this.$set(this.posts, index, response.data);
        this.isModalOpen = false; // Close modal after successful update
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Tailwind CSS styles can be added here */
</style>
