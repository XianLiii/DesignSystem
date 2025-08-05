<template>
  <div class="flex h-screen bg-white">
    <!-- 左侧导航栏 -->
    <div class="w-80 bg-white shadow-lg border-r border-gray-200">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-black mb-8">Design System Editor</h1>
        
        <!-- 导航菜单 -->
        <nav class="space-y-4">
          <div 
            v-for="item in navItems" 
            :key="item.id"
            @click="handleNavClick(item.id)"
            :class="[
              'flex items-center p-3 rounded cursor-pointer transition-colors duration-200',
              currentPage === item.id 
                ? 'bg-blue-100 text-blue-700' 
                : 'hover:bg-gray-50'
            ]"
          >
            <div 
              :class="[
                'w-5 h-5 rounded mr-3 transition-colors duration-200',
                currentPage === item.id ? 'bg-blue-500' : 'bg-gray-300'
              ]"
            ></div>
            <span class="text-sm">{{ item.name }}</span>
          </div>
        </nav>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="flex-1 overflow-auto">
      <component :is="currentComponent" :key="currentPage" />
    </div>
    
    <!-- 需求检查器 -->
    <!-- <RequirementsChecker /> -->
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import TokenList from './components/TokenList.vue'
import ButtonComponent from './components/ButtonComponent.vue'
import InputComponent from './components/InputComponent.vue'
import Instructions from './components/Instructions.vue'
import TokenOverview from './components/TokenOverview.vue'
import TableComponent from './components/TableComponent.vue'

const currentPage = ref('instructions')
const isNavigating = ref(false)

const navItems = [
  { id: 'instructions', name: '使用说明' },
  { id: 'overview', name: 'Design Token概述' },
  { id: 'tokens', name: '全量Token' },
  { id: 'button', name: 'Button' },
  { id: 'input', name: 'Input' },
  { id: 'table', name: 'Table' }
]

const currentComponent = computed(() => {
  const components = {
    instructions: Instructions,
    overview: TokenOverview,
    tokens: TokenList,
    button: ButtonComponent,
    input: InputComponent,
    table: TableComponent
  }
  return components[currentPage.value]
})

const handleNavClick = async (pageId) => {
  if (isNavigating.value || currentPage.value === pageId) {
    return
  }
  
  isNavigating.value = true
  
  try {
    currentPage.value = pageId
    // 确保DOM更新完成
    await nextTick()
  } catch (error) {
    console.error('Navigation error:', error)
  } finally {
    // 短暂延迟确保组件完全加载
    setTimeout(() => {
      isNavigating.value = false
    }, 100)
  }
}
</script> 