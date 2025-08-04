<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-8">Button 组件</h1>
    
    <!-- Button Token统计 -->
    <TokenStats 
      title="Button Token统计"
      :custom-stats="buttonTokenStats"
      :stats-to-show="['componentCount', 'variantCount', 'componentTokenCount', 'semanticTokenCount', 'baseTokenCount']"
    />
    
    <!-- 可交互的组件示例 -->
    <section v-if="buttonTokens.length > 0" class="mb-12">
      <h2 class="text-xl font-bold mb-6">可交互组件示例</h2>
      <div class="space-y-6">
        <!-- Primary Button -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Primary Button</h3>
          <div class="flex space-x-4">
            <button 
              class="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-800 active:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="{ 'opacity-50 cursor-not-allowed': primaryDisabled }"
              @click="handlePrimaryClick"
              :disabled="primaryDisabled"
            >
              {{ primaryText }}
            </button>
            <button 
              @click="primaryDisabled = !primaryDisabled"
              class="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
            >
              {{ primaryDisabled ? '启用' : '禁用' }}
            </button>
          </div>
        </div>

        <!-- Secondary Button -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Secondary Button</h3>
          <div class="flex space-x-4">
            <button 
              class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="{ 'opacity-50 cursor-not-allowed': secondaryDisabled }"
              @click="handleSecondaryClick"
              :disabled="secondaryDisabled"
            >
              {{ secondaryText }}
            </button>
            <button 
              @click="secondaryDisabled = !secondaryDisabled"
              class="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
            >
              {{ secondaryDisabled ? '启用' : '禁用' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 静态样式展示 -->
    <section v-if="buttonTokens.length > 0" class="mb-12">
      <h2 class="text-xl font-bold mb-6">交互状态样式展示</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Primary Button 状态 -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Primary Button 状态</h3>
          <div class="space-y-3">
            <div class="flex items-center space-x-4">
              <button class="bg-gray-900 text-white px-4 py-2 rounded text-sm">Default</button>
              <span class="text-sm text-gray-600">默认状态</span>
            </div>
            <div class="flex items-center space-x-4">
              <button class="bg-gray-800 text-white px-4 py-2 rounded text-sm">Hover</button>
              <span class="text-sm text-gray-600">悬停状态</span>
            </div>
            <div class="flex items-center space-x-4">
              <button class="bg-gray-700 text-white px-4 py-2 rounded text-sm">Active</button>
              <span class="text-sm text-gray-600">激活状态</span>
            </div>
            <div class="flex items-center space-x-4">
              <button class="bg-gray-900 text-white px-4 py-2 rounded text-sm opacity-50 cursor-not-allowed">Disabled</button>
              <span class="text-sm text-gray-600">禁用状态</span>
            </div>
          </div>
        </div>

        <!-- Secondary Button 状态 -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Secondary Button 状态</h3>
          <div class="space-y-3">
            <div class="flex items-center space-x-4">
              <button class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm">Default</button>
              <span class="text-sm text-gray-600">默认状态</span>
            </div>
            <div class="flex items-center space-x-4">
              <button class="bg-gray-50 border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm">Hover</button>
              <span class="text-sm text-gray-600">悬停状态</span>
            </div>
            <div class="flex items-center space-x-4">
              <button class="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm">Active</button>
              <span class="text-sm text-gray-600">激活状态</span>
            </div>
            <div class="flex items-center space-x-4">
              <button class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm opacity-50 cursor-not-allowed">Disabled</button>
              <span class="text-sm text-gray-600">禁用状态</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Button Token配置表格 -->
    <section class="mb-12">
      <h2 class="text-xl font-bold mb-6">Button Token配置</h2>
      <TokenTable :tokens="buttonTokens" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getComponentTokens, semanticTokens, componentTokens, baseTokens } from '../stores/tokenStore'
import TokenTable from './TokenTable.vue'
import TokenStats from './TokenStats.vue'

const primaryText = ref('Primary Button')
const secondaryText = ref('Secondary Button')
const primaryDisabled = ref(false)
const secondaryDisabled = ref(false)
// Button Token数据 - 响应式计算
const buttonTokens = computed(() => {
  const tokens = getComponentTokens('button')
  return tokens.length > 0 ? tokens : []
})

// Button Token统计
const buttonTokenStats = computed(() => {
  // 使用与全局统计相同的逻辑
  const uniqueBaseTokenNames = new Set()
  const uniqueSemanticTokenNames = new Set()
  const uniqueComponentTokenNames = new Set()
  const variants = new Set()
  
  buttonTokens.value.forEach(token => {
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
    componentCount: buttonTokens.value.length > 0 ? 1 : 0, // 只有有Token数据时才显示组件计数
    baseTokenCount: uniqueBaseTokenNames.size,
    semanticTokenCount: uniqueSemanticTokenNames.size,
    componentTokenCount: uniqueComponentTokenNames.size,
    variantCount: variants.size
  }
})

const handlePrimaryClick = () => {
  alert('Primary Button clicked!')
}

const handleSecondaryClick = () => {
  alert('Secondary Button clicked!')
}

// 移除onMounted，因为现在使用computed属性
</script> 