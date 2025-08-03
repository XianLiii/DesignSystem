<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- 检查按钮 -->
    <button 
      @click="toggleChecker"
      class="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-colors"
      :class="{ 'animate-pulse': isChecking }"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </button>

    <!-- 检查结果面板 -->
    <div 
      v-if="showResults" 
      class="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto"
    >
      <!-- 标题栏 -->
      <div class="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-800">需求检查结果</h3>
        <button @click="showResults = false" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- 摘要 -->
      <div v-if="checkResults.summary" class="p-4 border-b border-gray-200">
        <div class="flex items-center space-x-4 mb-3">
          <div class="flex items-center">
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              :class="{
                'bg-green-500': checkResults.summary.status === 'all_good',
                'bg-yellow-500': checkResults.summary.status === 'warnings',
                'bg-red-500': checkResults.summary.status === 'issues_found'
              }"
            >
              {{ checkResults.summary.score }}%
            </div>
          </div>
          <div>
            <div class="text-sm text-gray-600">
              总计 {{ checkResults.summary.total }} 项检查
            </div>
            <div class="flex space-x-4 text-xs">
              <span class="text-green-600">✓ {{ checkResults.summary.passed }}</span>
              <span v-if="checkResults.summary.warnings > 0" class="text-yellow-600">⚠ {{ checkResults.summary.warnings }}</span>
              <span v-if="checkResults.summary.failed > 0" class="text-red-600">✗ {{ checkResults.summary.failed }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 检查项列表 -->
      <div class="max-h-64 overflow-y-auto">
        <div v-for="result in checkResults.results" :key="result.id" class="p-3 border-b border-gray-100 last:border-b-0">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 mt-1">
              <div 
                class="w-4 h-4 rounded-full flex items-center justify-center"
                :class="{
                  'bg-green-500': result.status === 'pass',
                  'bg-yellow-500': result.status === 'warning',
                  'bg-red-500': result.status === 'fail'
                }"
              >
                <svg v-if="result.status === 'pass'" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <svg v-else-if="result.status === 'warning'" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                <svg v-else class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900">{{ result.title }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ result.description }}</div>
              <div class="text-xs text-gray-600 mt-1">{{ result.details }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部操作 -->
      <div class="p-3 border-t border-gray-200 text-center">
        <button 
          @click="runCheck" 
          :disabled="isChecking"
          class="text-sm text-purple-600 hover:text-purple-800 disabled:opacity-50"
        >
          {{ isChecking ? '检查中...' : '重新检查' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { runAllRequirementsCheck } from '../utils/requirementsChecker'

const showResults = ref(false)
const isChecking = ref(false)
const checkResults = reactive({
  results: [],
  summary: null
})

const toggleChecker = () => {
  if (!showResults.value) {
    runCheck()
  }
  showResults.value = !showResults.value
}

const runCheck = async () => {
  isChecking.value = true
  
  try {
    // 模拟检查过程
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const results = runAllRequirementsCheck()
    checkResults.results = results.results
    checkResults.summary = results.summary
    
    console.log('需求检查完成:', results)
  } catch (error) {
    console.error('需求检查失败:', error)
  } finally {
    isChecking.value = false
  }
}
</script>