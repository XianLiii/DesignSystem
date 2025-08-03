<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Design Token System</h1>
    <div class="space-y-4">
      <button 
        v-for="page in pages" 
        :key="page.id"
        @click="currentPage = page.id"
        :class="[
          'px-4 py-2 rounded mr-2',
          currentPage === page.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
        ]"
      >
        {{ page.name }}
      </button>
    </div>
    
    <div class="mt-6 p-4 border rounded">
      <div v-if="currentPage === 'overview'">
        <h2 class="text-xl mb-2">概述页面</h2>
        <p>这是概述页面的内容</p>
      </div>
      
      <div v-else-if="currentPage === 'tokens'">
        <h2 class="text-xl mb-2">Token列表</h2>
        <p>这是Token列表页面的内容</p>
      </div>
      
      <div v-else>
        <h2 class="text-xl mb-2">其他页面</h2>
        <p>页面ID: {{ currentPage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref('overview')

const pages = [
  { id: 'overview', name: '概述' },
  { id: 'tokens', name: 'Token列表' },
  { id: 'button', name: '按钮' },
  { id: 'input', name: '输入框' }
]

console.log('简化应用已加载')
</script>