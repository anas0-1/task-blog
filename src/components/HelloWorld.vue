<template>
    <div>
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
      <button @click="deletePost">Delete</button>
      <router-link :to="`/posts/${post.id}/edit`">Edit</router-link>
      <comment-list :postId="post.id"></comment-list>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  
  export default {
    
    created() {
      axios.get(`http://localhost:3000/posts/${this.$route.params.id}`)
        .then(response => {
          this.post = response.data;
        });
    },
    methods: {
      deletePost() {
        axios.delete(`http://localhost:3000/posts/${this.$route.params.id}`)
          .then(() => {
            this.$router.push('/posts');
          });
      },
    },
  };
  </script>
  