<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-8">Input 组件</h1>
    
    <!-- Input Token统计 -->
    <TokenStats 
      title="Input Token统计"
      :custom-stats="inputTokenStats"
      :stats-to-show="['componentCount', 'variantCount', 'componentTokenCount', 'semanticTokenCount', 'baseTokenCount']"
    />
    
    <!-- 可交互的组件示例 -->
    <section class="mb-12">
      <h2 class="text-xl font-bold mb-6">可交互组件示例</h2>
      <div class="space-y-6">
        <!-- Default Input -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Default Input</h3>
          <div class="flex space-x-4 items-center">
            <input 
              v-model="defaultValue"
              type="text"
              placeholder="请输入内容..."
              class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'opacity-50 cursor-not-allowed': inputDisabled }"
              :disabled="inputDisabled"
            />
            <button 
              @click="inputDisabled = !inputDisabled"
              class="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
            >
              {{ inputDisabled ? '启用' : '禁用' }}
            </button>
          </div>
        </div>

        <!-- Error Input -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Error Input</h3>
          <div class="flex space-x-4 items-center">
            <input 
              v-model="errorValue"
              type="text"
              placeholder="错误状态输入框"
              class="border border-red-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-red-50"
            />
            <span class="text-sm text-red-600">请输入有效内容</span>
          </div>
        </div>

        <!-- Success Input -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Success Input</h3>
          <div class="flex space-x-4 items-center">
            <input 
              v-model="successValue"
              type="text"
              placeholder="成功状态输入框"
              class="border border-green-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50"
            />
            <span class="text-sm text-green-600">✓ 输入有效</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 静态样式展示 -->
    <section class="mb-12">
      <h2 class="text-xl font-bold mb-6">交互状态样式展示</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Input 状态 -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Input 状态</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Default</label>
              <input 
                type="text"
                placeholder="默认状态"
                class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                readonly
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Focus</label>
              <input 
                type="text"
                placeholder="聚焦状态"
                class="w-full border border-blue-500 rounded px-3 py-2 text-sm ring-2 ring-blue-500 ring-opacity-50"
                readonly
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Error</label>
              <input 
                type="text"
                placeholder="错误状态"
                class="w-full border border-red-300 rounded px-3 py-2 text-sm bg-red-50"
                readonly
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Disabled</label>
              <input 
                type="text"
                placeholder="禁用状态"
                class="w-full border border-gray-300 rounded px-3 py-2 text-sm opacity-50 cursor-not-allowed"
                disabled
              />
            </div>
          </div>
        </div>

        <!-- Input 变体 -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Input 变体</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Small</label>
              <input 
                type="text"
                placeholder="小尺寸输入框"
                class="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                readonly
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Large</label>
              <input 
                type="text"
                placeholder="大尺寸输入框"
                class="w-full border border-gray-300 rounded px-4 py-3 text-base"
                readonly
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">With Icon</label>
              <div class="relative">
                <input 
                  type="text"
                  placeholder="带图标的输入框"
                  class="w-full border border-gray-300 rounded px-3 py-2 text-sm pl-10"
                  readonly
                />
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Input Token配置表格 -->
    <section class="mb-12">
      <h2 class="text-xl font-bold mb-6">Input Token配置</h2>
      <TokenTable :tokens="inputTokens" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getComponentTokens, semanticTokens, componentTokens, baseTokens } from '../stores/tokenStore'
import TokenTable from './TokenTable.vue'
import TokenStats from './TokenStats.vue'

const defaultValue = ref('')
const errorValue = ref('')
const successValue = ref('')
const inputDisabled = ref(false)
const inputTokens = ref([])

// Input Token统计
const inputTokenStats = computed(() => {
  // 获取Input组件的所有Token数据
  const inputTokenData = getComponentTokens('input')
  
  // 使用与全局统计相同的逻辑
  const uniqueBaseTokenNames = new Set()
  const uniqueSemanticTokenNames = new Set()
  const uniqueComponentTokenNames = new Set()
  const variants = new Set()
  
  inputTokenData.forEach(token => {
    // 基础Token名称：只要名称不一样就算一个
    if (token.baseToken) {
      uniqueBaseTokenNames.add(token.baseToken)
    }
    
    // 语义Token名称：只要名称不一样就算一个
    if (token.semanticToken) {
      uniqueSemanticTokenNames.add(token.semanticToken)
    }
    
    // 组件Token名称：完整的组件Token名称（包含样式属性）
    if (token.componentToken) {
      uniqueComponentTokenNames.add(token.componentToken)
    }
    
    // 变体：从token的variant字段获取
    if (token.variant) {
      variants.add(token.variant)
    }
  })

  return {
    componentCount: 1, // Input组件页面只有一个组件
    baseTokenCount: uniqueBaseTokenNames.size,
    semanticTokenCount: uniqueSemanticTokenNames.size,
    componentTokenCount: uniqueComponentTokenNames.size,
    variantCount: variants.size
  }
})

onMounted(() => {
  inputTokens.value = getComponentTokens('input')
})
</script> 