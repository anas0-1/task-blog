<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
          <router-link 
            v-for="link in navLinks" 
            :key="link.to" 
            :to="link.to" 
            class="text-gray-700 hover:text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-600 text-sm font-medium transition duration-150 ease-in-out"
            active-class="border-indigo-600 text-indigo-600"
          >
            {{ link.text }}
          </router-link>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <button 
            @click="logout" 
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button @click="isOpen = !isOpen" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed -->
            <svg :class="{'hidden': isOpen, 'block': !isOpen }" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Icon when menu is open -->
            <svg :class="{'block': isOpen, 'hidden': !isOpen }" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div :class="{'block': isOpen, 'hidden': !isOpen}" class="sm:hidden" id="mobile-menu">
      <div class="pt-2 pb-3 space-y-1">
        <router-link 
          v-for="link in navLinks" 
          :key="link.to" 
          :to="link.to" 
          class="text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium transition duration-150 ease-in-out"
          active-class="bg-indigo-50 border-indigo-600 text-indigo-600"
        >
          {{ link.text }}
        </router-link>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4">
          <button 
            @click="logout" 
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      isOpen: false,
      navLinks: [
        { to: '/posts', text: 'Posts' },
        { to: '/todos', text: 'Todos' },
        { to: '/user', text: 'User' },
      ],
    };
  },
  methods: {
    logout() {
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      if (loggedInUserId) {
        localStorage.removeItem('loggedInUserId');
        console.log('User logged out successfully.');
        this.$router.push('/login');
      }
    }
  }
}
</script>