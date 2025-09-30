<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand fw-bold text-uppercase">Pixelzone</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown me-3" v-if="isLoggedIn" ref="dropdownRef">
              <a @click.prevent="toggleDropdown" class="nav-link" href="#" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" :class="{ show: showDropdown }">
                <li><router-link to="/checkout" class="dropdown-item" @click="showDropdown = false">Checkout</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><a @click.prevent="handleLogout" class="dropdown-item" href="#">Logout</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown me-3" v-if="isLoggedIn" ref="menuDropdownRef">
              <a @click.prevent="toggleMenuDropdown" class="nav-link" href="#" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" :class="{ show: showMenuDropdown }">
                <li><router-link to="/categories" class="dropdown-item" @click="showMenuDropdown = false">Kategori</router-link></li>
                <li><router-link to="/products" class="dropdown-item" @click="showMenuDropdown = false">Produk</router-link></li>
              </ul>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link to="/login" class="btn btn-primary me-3">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <div class="container-fluid mt-5">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" @update-login-status="updateLoginStatus" />
          </transition>
        </router-view>
      </div>
    </main>
    <footer class="bg-dark text-white text-center p-3">
      &copy; 2025 Pixelzone. All Rights Reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import api from './axios';

const router = useRouter();
const isLoggedIn = ref(false);
const showDropdown = ref(false);
const dropdownRef = ref(null);
const showMenuDropdown = ref(false);
const menuDropdownRef = ref(null);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const toggleMenuDropdown = () => {
  showMenuDropdown.value = !showMenuDropdown.value;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
  if (menuDropdownRef.value && !menuDropdownRef.value.contains(event.target)) {
    showMenuDropdown.value = false;
  }
};

const updateLoginStatus = async () => {
  try {
    await api.get('/user');
    isLoggedIn.value = true;
  } catch (error) {
    isLoggedIn.value = false;
  }
};

const handleLogout = async () => {
  try {
    await api.post('/logout');
    isLoggedIn.value = false;
    showDropdown.value = false; // Hide dropdown on logout
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

onMounted(() => {
  updateLoginStatus();
  document.addEventListener('click', handleClickOutside, true);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true);
});
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  overflow-y: auto; /* Allow vertical scroll */
  overflow-x: hidden; /* Prevent horizontal scroll */
}

/* Styling Global */
body {
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  background-color: #f5f5f7; /* Apple-like light gray */
  color: #1d1d1f; /* Apple-like black text */
  min-height: 100vh;
}

/* Improved Dropdown Styles */
.navbar-nav .dropdown-menu {
  position: absolute;
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
}

.navbar-nav .dropdown-menu-end {
  right: 0;
  left: auto;
}

/* Page Transition Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
