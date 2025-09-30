<template>
  <div class="container mt-5">
    <h2>Edit Produk</h2>
    <form @submit.prevent="updateProduk">
      <div class="mb-3">
        <label for="name" class="form-label">Nama Produk</label>
        <input
          v-model="produk.name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Masukkan Nama Produk"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Deskripsi</label>
        <textarea
          v-model="produk.description"
          class="form-control"
          id="description"
          rows="3"
          placeholder="Masukkan Deskripsi Produk"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Harga</label>
        <input
          v-model="produk.price"
          type="number"
          class="form-control"
          id="price"
          placeholder="Masukkan Harga Produk"
          required
        />
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Kategori</label>
        <select v-model="produk.category_id" class="form-control" id="category" required>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const produk = ref({
  name: '',
  description: '',
  price: '',
  category_id: '',
});

const categories = ref([]);

// Mengambil data kategori
const fetchCategories = () => {
  axios.get('http://127.0.0.1:8000/api/categories').then((response) => {
    categories.value = response.data.data;
  });
};

// Mengambil data produk untuk edit
const fetchProduk = (id) => {
  axios.get(`http://127.0.0.1:8000/api/products/${id}`).then((response) => {
    produk.value = response.data.data;
  });
};

// Mengupdate produk
const updateProduk = () => {
  axios
    .put(`http://127.0.0.1:8000/api/products/${route.params.id}`, produk.value)
    .then(() => {
      router.push('/'); // Arahkan ke halaman utama setelah berhasil
    });
};

// Ambil data produk dan kategori saat halaman dimuat
onMounted(() => {
  fetchCategories();
  fetchProduk(route.params.id); // Ambil data produk berdasarkan id
});
</script>
