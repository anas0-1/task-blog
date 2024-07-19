<template>
  <div>
    <AppNavbar />

    <div class="container mx-auto p-6">
      <h2 class="text-3xl font-bold mb-8 text-center">Posts</h2>

      <!-- Form to create new post -->
      <div class="max-w-lg mx-auto mb-8">
        <form @submit.prevent="createPost" class="bg-white p-6 rounded-lg shadow-md space-y-6">
          <h3 class="text-2xl font-semibold mb-4">Create New Post</h3>
          <div>
            <label for="title" class="block text-gray-700">Title:</label>
            <input type="text" v-model="newPost.title" class="mt-1 p-2 w-full border rounded" required />
          </div>
          <div>
            <label for="body" class="block text-gray-700">Body:</label>
            <textarea v-model="newPost.body" class="mt-1 p-2 w-full border rounded" required></textarea>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create Post</button>
        </form>
      </div>

      <!-- List of posts -->
      <ul class="space-y-6">
        <li v-for="post in posts" :key="post.id" class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="text-xl font-semibold text-blue-600 hover:underline cursor-pointer" @click="editPost(post)">{{ post.title }}</h4>
              <p class="text-gray-700">{{ post.body }}</p>
            </div>
            <div v-if="post.userId === loggedInUserId">
              <button @click="editPost(post)" class="bg-yellow-400 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-500">Edit</button>
              <button @click="deletePost(post.id)" class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        </li>
      </ul>

      <!-- Modal for updating post -->
      <Modal v-if="isModalOpen" @close="isModalOpen = false">
        <form @submit.prevent="updatePost" class="space-y-6 p-6">
          <h3 class="text-2xl font-semibold mb-4">Edit Post</h3>
          <div>
            <label for="title" class="block text-gray-700">Title:</label>
            <input type="text" v-model="currentPost.title" class="mt-1 p-2 w-full border rounded" required />
          </div>
          <div>
            <label for="body" class="block text-gray-700">Body:</label>
            <textarea v-model="currentPost.body" class="mt-1 p-2 w-full border rounded" required></textarea>
          </div>
          <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Update Post</button>
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
      posts: [],
      newPost: {
        title: '',
        body: '',
        userId: null
      },
      currentPost: {},
      isModalOpen: false,
      loggedInUserId: null
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
      this.newPost.userId = this.loggedInUserId;
      try {
        const response = await axios.post('http://localhost:3000/posts', this.newPost);
        this.posts.push(response.data);
        this.newPost.title = '';
        this.newPost.body = '';
      } catch (error) {
        console.error('Error creating post:', error);
      }
    },
    async deletePost(postId) {
      try {
        await axios.delete(`http://localhost:3000/posts/${postId}`);
        this.posts = this.posts.filter(post => post.id !== postId);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    },
    editPost(post) {
      if (post.userId === this.loggedInUserId) {
        this.currentPost = { ...post };
        this.isModalOpen = true;
      } else {
        console.error('You do not have permission to edit this post.');
      }
    },
    async updatePost() {
      try {
        const response = await axios.put(`http://localhost:3000/posts/${this.currentPost.id}`, this.currentPost);
        const index = this.posts.findIndex(post => post.id === this.currentPost.id);
        this.$set(this.posts, index, response.data);
        this.isModalOpen = false;
      } catch (error) {
        console.error('Error updating post:', error);
      }
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
