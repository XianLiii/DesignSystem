<template>
  <div>
    <!-- 表格筛选器 -->
    <div class="mb-4">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <!-- 变体筛选 -->
        <select v-model="filters.variant" class="border border-gray-300 rounded px-2 py-2 text-sm">
          <option value="">全部变体</option>
          <option v-for="variant in uniqueVariants" :key="variant" :value="variant">{{ getVariantLabel(variant) }}</option>
        </select>
        
        <!-- 交互状态筛选 -->
        <select v-model="filters.state" class="border border-gray-300 rounded px-2 py-2 text-sm">
          <option value="">全部交互状态</option>
          <option v-for="state in uniqueStates" :key="state" :value="state">{{ getStateLabel(state) }}</option>
        </select>
        
        <!-- 语义Token类型筛选 -->
        <select v-model="filters.semanticType" class="border border-gray-300 rounded px-2 py-2 text-sm">
          <option value="">全部语义Token类型</option>
          <option v-for="type in uniqueSemanticTypes" :key="type" :value="type">{{ getSemanticTypeLabel(type) }}</option>
        </select>
        
        <!-- 基础Token类型筛选 -->
        <select v-model="filters.baseType" class="border border-gray-300 rounded px-2 py-2 text-sm">
          <option value="">全部基础Token类型</option>
          <option v-for="type in uniqueBaseTypes" :key="type" :value="type">{{ getBaseTypeLabel(type) }}</option>
        </select>
      </div>
      
      <!-- 第二行：Token名称筛选 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-3">
        <!-- 组件Token搜索 -->
        <input 
          v-model="filters.componentTokenSearch" 
          placeholder="搜索组件Token名称..."
          class="border border-gray-300 rounded px-2 py-2 text-sm"
        />
        
        <!-- 语义Token搜索 -->
        <input 
          v-model="filters.semanticTokenSearch" 
          placeholder="搜索语义Token名称..."
          class="border border-gray-300 rounded px-2 py-2 text-sm"
        />
        
        <!-- 基础Token搜索 -->
        <input 
          v-model="filters.baseTokenSearch" 
          placeholder="搜索基础Token名称..."
          class="border border-gray-300 rounded px-2 py-2 text-sm"
        />
      </div>
    </div>
    
    <!-- 表格 -->
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full table-auto min-w-max">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-1 py-1.5 text-left text-xs font-bold text-gray-800 min-w-0 whitespace-nowrap">序号</th>
              <th class="px-1 py-1.5 text-left text-xs font-bold text-gray-800 min-w-0 whitespace-nowrap">组件</th>
              <th class="px-1 py-1.5 text-left text-xs font-bold text-gray-800 min-w-0 whitespace-nowrap">变体</th>
              <th class="px-1 py-1.5 text-left text-xs font-bold text-gray-800 min-w-0 whitespace-nowrap">状态</th>
              <th class="px-1 py-1.5 text-left text-xs font-bold text-gray-800 min-w-0 whitespace-nowrap">组件Token</th>
              <th class="px-1 py-1.5 text-left text-xs font-bold text-gray-800 min-w-0 whitespace-nowrap">组件用途</th>
              <th class="px-1 py-1.5 text-left text-xs font-bold text-gray-800 min-w-0 whitespace-nowrap">语义类型</th>
              <th class="px-1 py-1.5 text-left text-xs font-bold text-gray-800 min-w-0 whitespace-nowrap">语义Token</th>
              <th class="px-1 py-1.5 text-left text-xs font-bold text-gray-800 min-w-0 whitespace-nowrap">语义用途</th>
              <th class="px-1 py-1.5 text-left text-xs font-bold text-gray-800 min-w-0 whitespace-nowrap">基础类型</th>
              <th class="px-1 py-1.5 text-left text-xs font-bold text-gray-800 min-w-0 whitespace-nowrap">基础Token</th>
              <th class="px-1 py-1.5 text-left text-xs font-bold text-gray-800 min-w-0 whitespace-nowrap">基础值</th>
              <th class="px-1 py-1.5 text-left text-xs font-bold text-gray-800 min-w-0 whitespace-nowrap">基础用途</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(token, index) in filteredTokens" 
              :key="index"
              class="border-b border-gray-100 hover:bg-gray-50 text-xs"
            >
              <!-- 序号 -->
              <td class="px-1 py-1.5">
                <span class="text-gray-600 font-medium">{{ index + 1 }}</span>
              </td>
              
              <!-- 组件 -->
              <td class="px-1 py-1.5">
                <span v-if="token.componentName" 
                      class="inline-block bg-orange-100 text-orange-800 px-1 py-0.5 rounded text-xs font-medium">
                  {{ getComponentNameLabel(token.componentName) }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>
              
              <!-- 变体 -->
              <td class="px-1 py-1.5">
                <span v-if="token.variant" 
                      class="inline-block bg-orange-100 text-orange-800 px-1 py-0.5 rounded text-xs font-medium">
                  {{ getVariantLabel(token.variant) }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>
              
              <!-- 交互状态 -->
              <td class="px-1 py-1.5">
                <span v-if="token.componentState" 
                      :class="getStateClass(token.componentState)"
                      class="inline-block px-1 py-0.5 rounded-full text-xs font-medium">
                  {{ getStateLabel(token.componentState) }}
                </span>
                <span v-else class="inline-block bg-gray-100 text-gray-600 px-1 py-0.5 rounded-full text-xs font-medium">
                  不可交互
                </span>
              </td>
              
              <!-- 组件Token名称 -->
              <td class="px-1 py-1.5">
                <span v-if="token.componentToken" 
                      class="inline-block bg-purple-100 text-purple-800 px-1 py-0.5 rounded-full text-xs font-medium">
                  {{ token.componentToken }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>
              
              <!-- 组件Token用途 -->
              <td class="px-2 py-1 text-xs text-gray-700">
                {{ getComponentUsageLabel(token.componentUsage) || '-' }}
              </td>
              
              <!-- 语义Token类型 -->
              <td class="px-2 py-1 text-xs text-gray-700">
                {{ getSemanticTypeLabel(token.semanticType) || '-' }}
              </td>
              
              <!-- 语义Token名称 -->
              <td class="px-1 py-1.5">
                <span v-if="token.semanticToken" 
                      class="inline-block bg-blue-100 text-blue-800 px-1 py-0.5 rounded-full text-xs font-medium">
                  {{ token.semanticToken }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>
              
              <!-- 语义Token用途 -->
              <td class="px-2 py-1 text-xs text-gray-700">
                {{ getSemanticUsageLabel(token.semanticUsage) || '-' }}
              </td>
              
              <!-- 基础Token类型 -->
              <td class="px-2 py-1 text-xs text-gray-700">
                {{ getBaseTypeLabel(token.baseType) || '-' }}
              </td>
              
              <!-- 基础Token名称 -->
              <td class="px-1 py-1.5">
                <span v-if="token.baseToken" 
                      class="inline-block bg-green-100 text-green-800 px-1 py-0.5 rounded-full text-xs font-medium">
                  {{ token.baseToken }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>
              
              <!-- 基础Token值 -->
              <td class="px-2 py-1 text-xs text-gray-700 font-mono">
                {{ token.baseValue || '-' }}
              </td>
              
              <!-- 基础Token用途 -->
              <td class="px-2 py-1 text-xs text-gray-700">
                {{ getBaseUsageLabel(token.baseUsage) || '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  tokens: {
    type: Array,
    required: true
  }
})

// 筛选器状态
const filters = ref({
  baseType: '',
  semanticType: '',
  state: '',
  variant: '',
  componentTokenSearch: '',
  semanticTokenSearch: '',
  baseTokenSearch: ''
})

// 筛选后的数据
const filteredTokens = computed(() => {
  let filtered = props.tokens

  // 基础Token类型筛选
  if (filters.value.baseType) {
    filtered = filtered.filter(token => token.baseType === filters.value.baseType)
  }

  // 语义Token类型筛选
  if (filters.value.semanticType) {
    filtered = filtered.filter(token => token.semanticType === filters.value.semanticType)
  }

  // 交互状态筛选
  if (filters.value.state) {
    if (filters.value.state === '不可交互') {
      filtered = filtered.filter(token => !token.componentState)
    } else {
      filtered = filtered.filter(token => token.componentState === filters.value.state)
    }
  }

  // 变体筛选
  if (filters.value.variant) {
    filtered = filtered.filter(token => token.variant === filters.value.variant)
  }

  // 组件Token搜索
  if (filters.value.componentTokenSearch) {
    const searchTerm = filters.value.componentTokenSearch.toLowerCase()
    filtered = filtered.filter(token => {
      return token.componentToken && token.componentToken.toLowerCase().includes(searchTerm)
    })
  }

  // 语义Token搜索
  if (filters.value.semanticTokenSearch) {
    const searchTerm = filters.value.semanticTokenSearch.toLowerCase()
    filtered = filtered.filter(token => {
      return token.semanticToken && token.semanticToken.toLowerCase().includes(searchTerm)
    })
  }

  // 基础Token搜索
  if (filters.value.baseTokenSearch) {
    const searchTerm = filters.value.baseTokenSearch.toLowerCase()
    filtered = filtered.filter(token => {
      return token.baseToken && token.baseToken.toLowerCase().includes(searchTerm)
    })
  }

  return filtered
})

// 基础数据集：基于当前已选筛选条件动态计算可用选项
const getFilteredData = (excludeFields = []) => {
  return props.tokens.filter(token => {
    const checks = []
    
    if (!excludeFields.includes('variant') && filters.value.variant) {
      checks.push(token.variant === filters.value.variant)
    }
    if (!excludeFields.includes('state') && filters.value.state) {
      const tokenState = token.componentState || '不可交互'
      checks.push(tokenState === filters.value.state)
    }
    if (!excludeFields.includes('baseType') && filters.value.baseType) {
      checks.push(token.baseType === filters.value.baseType)
    }
    if (!excludeFields.includes('semanticType') && filters.value.semanticType) {
      checks.push(token.semanticType === filters.value.semanticType)
    }
    
    // Token搜索支持
    if (!excludeFields.includes('componentTokenSearch') && filters.value.componentTokenSearch) {
      const searchTerm = filters.value.componentTokenSearch.toLowerCase()
      checks.push(token.componentToken && token.componentToken.toLowerCase().includes(searchTerm))
    }
    if (!excludeFields.includes('semanticTokenSearch') && filters.value.semanticTokenSearch) {
      const searchTerm = filters.value.semanticTokenSearch.toLowerCase()
      checks.push(token.semanticToken && token.semanticToken.toLowerCase().includes(searchTerm))
    }
    if (!excludeFields.includes('baseTokenSearch') && filters.value.baseTokenSearch) {
      const searchTerm = filters.value.baseTokenSearch.toLowerCase()
      checks.push(token.baseToken && token.baseToken.toLowerCase().includes(searchTerm))
    }
    
    return checks.every(check => check)
  })
}

// 获取唯一值用于筛选器选项
const uniqueVariants = computed(() => {
  const variants = new Set()
  getFilteredData(['variant']).forEach(token => {
    if (token.variant) variants.add(token.variant)
  })
  return Array.from(variants).sort()
})

const uniqueStates = computed(() => {
  const states = new Set()
  let hasNonInteractive = false
  getFilteredData(['state']).forEach(token => {
    if (token.componentState) {
      states.add(token.componentState)
    } else {
      hasNonInteractive = true
    }
  })
  const stateArray = Array.from(states).sort()
  if (hasNonInteractive) {
    stateArray.push('不可交互')
  }
  return stateArray
})

const uniqueBaseTypes = computed(() => {
  const types = new Set()
  getFilteredData(['baseType']).forEach(token => {
    if (token.baseType) types.add(token.baseType)
  })
  return Array.from(types).sort()
})

const uniqueSemanticTypes = computed(() => {
  const types = new Set()
  getFilteredData(['semanticType']).forEach(token => {
    if (token.semanticType) types.add(token.semanticType)
  })
  return Array.from(types).sort()
})

// 移除了复杂的Token名称筛选器，改为简单的搜索框

// 中文标签处理函数
const getStateLabel = (state) => {
  const stateLabels = {
    'default': '默认',
    'hover': '悬停',
    'active': '激活',
    'disabled': '禁用',
    'focus': '聚焦',
    'error': '错误',
    'success': '成功'
  }
  return stateLabels[state] || state
}

const getStateClass = (state) => {
  const stateClasses = {
    'default': 'bg-gray-100 text-gray-700',
    'hover': 'bg-blue-100 text-blue-700',
    'active': 'bg-purple-100 text-purple-700',
    'disabled': 'bg-gray-200 text-gray-500',
    'focus': 'bg-yellow-100 text-yellow-700',
    'error': 'bg-red-100 text-red-700',
    'success': 'bg-green-100 text-green-700'
  }
  return stateClasses[state] || 'bg-gray-100 text-gray-700'
}

const getBaseTypeLabel = (type) => {
  const typeLabels = {
    'color': '颜色',
    'spacing': '间距', 
    'font-size': '字体',
    'border-radius': '边框'
  }
  return typeLabels[type] || type
}

const getSemanticTypeLabel = (type) => {
  const typeLabels = {
    'background-color': '背景色',
    'text-color': '文字色',
    'border-color': '边框色',
    'spacing': '空间距',
    'font-style': '字体样'
  }
  return typeLabels[type] || type
}

const getBaseUsageLabel = (usage) => {
  const usageMap = {
    '主要品牌色': '主品牌色',
    '中性色调': '中性色',
    '标准间距': '标准距',
    '小号字体': '小字体',
    '圆角样式': '圆角式'
  }
  return usageMap[usage] || usage
}

const getSemanticUsageLabel = (usage) => {
  const usageMap = {
    '按钮主要背景色': '按钮主背景',
    '按钮文字颜色': '按钮文字色',
    '输入框边框色': '输入框边框',
    '内容区域间距': '内容间距',
    '成功状态文字样式': '成功文字样式'
  }
  return usageMap[usage] || usage
}

const getComponentUsageLabel = (usage) => {
  const usageMap = {
    '按钮主要交互样式': '按钮主样式',
    '输入框交互样式': '输入框样式',
    '成功状态文字样式': '成功文字样式'
  }
  return usageMap[usage] || usage
}

const getVariantLabel = (variant) => {
  const variantLabels = {
    // Button变体 - 按完整组合定义
    'primary': '主按钮',
    'secondary': '次要按钮',
    'primary-small': '小尺寸主按钮',
    'primary-large': '大尺寸主按钮',
    
    // Input变体 - 按完整组合定义
    'standard': '标准输入框',
    'small': '小尺寸输入框',
    'large': '大尺寸输入框',
    
    // Common变体 - 保持原有逻辑
    'text-primary': '主要文字',
    'text-secondary': '次要文字',
    'text-muted': '弱化文字',
    'bg-primary': '主要背景',
    'bg-secondary': '次要背景',
    'border-primary': '主要边框',
    'border-subtle': '细微边框',
    'spacing-compact': '紧凑间距',
    'spacing-cozy': '舒适间距',
    'spacing-comfortable': '宽松间距',
    'spacing-spacious': '宽敞间距',
    'typography-body': '正文字体',
    'typography-heading': '标题字体',
    'typography-small': '小字体',
    'typography-emphasis': '强调字重',
    'radius-subtle': '细微圆角',
    'radius-moderate': '适中圆角',
    'radius-prominent': '明显圆角'
  }
  return variantLabels[variant] || variant
}

const getComponentNameLabel = (componentName) => {
  const nameLabels = {
    'button': '按钮',
    'input': '输入框',
    'common': '通用'
  }
  return nameLabels[componentName] || componentName
}
</script>