<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4 shadow-lg">
          <h2 class="text-center mb-4">Masuk</h2>
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" v-model="email" class="form-control" id="email" required />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Kata Sandi</label>
              <input type="password" v-model="password" class="form-control" id="password" required />
            </div>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <button type="submit" class="btn btn-primary w-100">Masuk</button>
          </form>
          <div class="text-center mt-3">
            <p>Belum punya akun? <router-link to="/register">Daftar di sini</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';
import api from '../../axios';
import { useRouter } from 'vue-router';

const emit = defineEmits(['update-login-status']);
const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref(null);

const handleLogin = async () => {
  error.value = null;
  try {
    // Get CSRF cookie
    await axios.get('/sanctum/csrf-cookie');

    // Attempt login
    const response = await api.post('/login', {
      email: email.value,
      password: password.value,
    });

    // Save token to localStorage if it exists
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }

    // Notify parent component
    emit('update-login-status');
    
    // Redirect to a protected route
    router.push('/dashboard');
  } catch (err) {
    error.value = 'Gagal masuk. Silakan periksa kembali kredensial Anda.';
    console.error('Login failed:', err);
  }
};
</script>
