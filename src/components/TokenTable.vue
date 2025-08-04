<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">组件Token</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">语义Token</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">基础Token</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">变体</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">值</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="token in tokens" :key="token.id" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ token.componentToken }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ token.semanticToken }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ token.baseToken }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ token.variant }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ token.state }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ token.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  tokens: {
    type: Array,
    required: true
  }
})
</script>