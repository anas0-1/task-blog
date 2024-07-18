<template>
    <div>
      <h2>Comments</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          {{ comment.body }}
          <button v-if="comment.userId === currentUser.id" @click="deleteComment(comment.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      postId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        comments: [],
        currentUser: { id: 1 } // Assuming user ID 1 is the current user, replace with actual user ID logic
      };
    },
    created() {
      axios.get(`http://localhost:3000/comments?postId=${this.postId}`)
        .then(response => {
          this.comments = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the comments:', error);
        });
    },
    methods: {
      deleteComment(commentId) {
        axios.delete(`http://localhost:3000/comments/${commentId}`)
          .then(() => {
            this.comments = this.comments.filter(comment => comment.id !== commentId);
          })
          .catch(error => {
            console.error('There was an error deleting the comment:', error);
          });
      }
    }
  };
  </script>
  