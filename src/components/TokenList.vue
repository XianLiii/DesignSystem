<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">全量Token</h1>
      <div class="flex space-x-3">
        <input
          ref="csvFileInput"
          type="file"
          accept=".csv"
          @change="handleCSVImport"
          class="hidden"
        />
        <button 
          @click="$refs.csvFileInput.click()"
          class="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          导入CSV文件
        </button>
        <button 
          @click="downloadCSV"
          class="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
        >
          下载CSV文件
        </button>
        <button 
          @click="showHistory = !showHistory"
          class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50"
        >
          查看修改记录
        </button>
      </div>
    </div>

    <!-- Token统计 - 根据筛选结果动态变化 -->
    <TokenStats 
      title="Token统计"
      :custom-stats="filteredStats"
      :stats-to-show="['componentCount', 'componentTokenCount', 'semanticTokenCount', 'baseTokenCount']"
    />

    <!-- Token筛选器 -->
    <div class="mb-5">
      <h2 class="text-lg font-bold mb-3">筛选器</h2>
      <div class="grid grid-cols-2 lg:grid-cols-7 gap-3">
        <!-- 组件筛选 -->
        <select v-model="filters.componentName" class="border border-gray-300 rounded px-2 py-2 text-sm">
          <option value="">全部组件</option>
          <option v-for="name in uniqueComponentNames" :key="name" :value="name">{{ getComponentNameLabel(name) }}</option>
        </select>
        
        <!-- 变体筛选 -->
        <select v-model="filters.variant" class="border border-gray-300 rounded px-2 py-2 text-sm">
          <option value="">全部变体</option>
          <option v-for="variant in uniqueVariants" :key="variant" :value="variant">{{ getVariantLabel(variant) }}</option>
        </select>
        
        <!-- 交互状态筛选 -->
        <select v-model="filters.componentState" class="border border-gray-300 rounded px-2 py-2 text-sm">
          <option value="">全部状态</option>
          <option v-for="state in uniqueStates" :key="state" :value="state">{{ state === '不可交互' ? '不可交互' : getStateLabel(state) }}</option>
        </select>
        
        <!-- 组件Token筛选 -->
        <select v-model="filters.componentToken" class="border border-gray-300 rounded px-2 py-2 text-sm">
          <option value="">全部组件Token</option>
          <option v-for="token in uniqueComponentTokens" :key="token" :value="token">{{ token }}</option>
        </select>
        
        <!-- 语义Token类型筛选 -->
        <select v-model="filters.semanticType" class="border border-gray-300 rounded px-2 py-2 text-sm">
          <option value="">全部语义类型</option>
          <option v-for="type in uniqueSemanticTypes" :key="type" :value="type">{{ getSemanticTypeLabel(type) }}</option>
        </select>
        
        <!-- 基础Token类型筛选 -->
        <select v-model="filters.baseType" class="border border-gray-300 rounded px-2 py-2 text-sm">
          <option value="">全部基础类型</option>
          <option v-for="type in uniqueBaseTypes" :key="type" :value="type">{{ getBaseTypeLabel(type) }}</option>
        </select>
        
        <!-- 组件Token名称筛选 -->
        <select v-model="filters.componentTokenName" class="border border-gray-300 rounded px-2 py-2 text-sm">
          <option value="">全部组件Token名称</option>
          <option v-for="name in uniqueComponentTokenNames" :key="name" :value="name">{{ name }}</option>
        </select>
      </div>
      
      <!-- 第二行筛选器 -->
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
        <!-- 语义Token名称筛选 -->
        <select v-model="filters.semanticTokenName" class="border border-gray-300 rounded px-2 py-2 text-sm">
          <option value="">全部语义Token名称</option>
          <option v-for="name in uniqueSemanticTokenNames" :key="name" :value="name">{{ name }}</option>
        </select>
        
        <!-- 基础Token名称筛选 -->
        <select v-model="filters.baseTokenName" class="border border-gray-300 rounded px-2 py-2 text-sm">
          <option value="">全部基础Token名称</option>
          <option v-for="name in uniqueBaseTokenNames" :key="name" :value="name">{{ name }}</option>
        </select>
        
        <!-- 搜索框保留 -->
        <input 
          v-model="searchTerm" 
          placeholder="搜索Token..."
          class="border border-gray-300 rounded px-2 py-2 text-sm"
        />
      </div>
    </div>

    <!-- Token表格 -->
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

    <!-- 修改记录弹窗 -->
    <div v-if="showHistory" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">修改记录</h3>
          <button @click="showHistory = false" class="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <div class="max-h-96 overflow-y-auto">
          <div v-if="historyRecords.length === 0" class="text-center text-gray-500 py-8">
            暂无修改记录
          </div>
          <div v-else v-for="(record, index) in historyRecords" :key="record.id" class="border-b border-gray-200 py-3">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-center space-x-2">
                  <span class="font-medium text-blue-600">{{ record.token }}</span>
                  <span class="text-gray-500">{{ record.oldValue }} → {{ record.newValue }}</span>
                </div>
                <div class="text-xs text-gray-400 mt-1">{{ record.timestamp }}</div>
              </div>
              <button 
                @click="revertRecord(record.id)"
                class="ml-4 px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
              >
                回退
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 回退成功提示 -->
    <div v-if="showRevertTip" class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
      {{ revertTipMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  getAllTokens, 
  updateTokenValue, 
  historyRecords, 
  revertHistoryRecord,
  tokenStats,
  importTokensFromCSV
} from '../stores/tokenStore'
import TokenStats from './TokenStats.vue'

// 响应式数据
const searchTerm = ref('')
const editingIndex = ref(-1)
const editingValue = ref('')
const validationError = ref('')
const showHistory = ref(false)
const showRevertTip = ref(false)
const revertTipMessage = ref('')

// 筛选器状态
const filters = ref({
  componentName: '',
  variant: '',
  baseType: '',
  semanticType: '',
  componentState: '',
  componentToken: '',
  componentTokenName: '',
  semanticTokenName: '',
  baseTokenName: ''
})

// 使用computed确保数据响应式更新
const allTokens = computed(() => getAllTokens())

// 筛选后的Token数据
const filteredTokens = computed(() => {
  let filtered = allTokens.value

  // 组件筛选
  if (filters.value.componentName) {
    filtered = filtered.filter(token => token.componentName === filters.value.componentName)
  }

  // 变体筛选
  if (filters.value.variant) {
    filtered = filtered.filter(token => token.variant === filters.value.variant)
  }

  // 基础Token类型筛选
  if (filters.value.baseType) {
    filtered = filtered.filter(token => token.baseType === filters.value.baseType)
  }

  // 语义Token类型筛选
  if (filters.value.semanticType) {
    filtered = filtered.filter(token => token.semanticType === filters.value.semanticType)
  }

  // 交互状态筛选
  if (filters.value.componentState) {
    if (filters.value.componentState === '不可交互') {
      filtered = filtered.filter(token => !token.componentState)
    } else {
      filtered = filtered.filter(token => token.componentState === filters.value.componentState)
    }
  }

  // 组件Token筛选
  if (filters.value.componentToken) {
    filtered = filtered.filter(token => token.componentToken === filters.value.componentToken)
  }

  // 组件Token名称筛选
  if (filters.value.componentTokenName) {
    filtered = filtered.filter(token => {
      const componentTokenName = token.componentToken ? token.componentToken.split('.')[1] : ''
      return componentTokenName === filters.value.componentTokenName
    })
  }

  // 语义Token名称筛选
  if (filters.value.semanticTokenName) {
    filtered = filtered.filter(token => {
      const semanticTokenName = token.semanticToken ? token.semanticToken.split('.')[1] : ''
      return semanticTokenName === filters.value.semanticTokenName
    })
  }

  // 基础Token名称筛选
  if (filters.value.baseTokenName) {
    filtered = filtered.filter(token => {
      const baseTokenName = token.baseToken ? token.baseToken.split('.')[1] : ''
      return baseTokenName === filters.value.baseTokenName
    })
  }

  // 搜索筛选
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(token => 
      (token.componentToken && token.componentToken.toLowerCase().includes(search)) ||
      (token.componentName && token.componentName.toLowerCase().includes(search)) ||
      (token.semanticToken && token.semanticToken.toLowerCase().includes(search)) ||
      (token.baseToken && token.baseToken.toLowerCase().includes(search)) ||
      (token.componentUsage && token.componentUsage.toLowerCase().includes(search)) ||
      (token.semanticUsage && token.semanticUsage.toLowerCase().includes(search)) ||
      (token.baseUsage && token.baseUsage.toLowerCase().includes(search))
    )
  }

  return filtered
})

// 根据筛选结果动态计算统计数据
const filteredStats = computed(() => {
  const filtered = filteredTokens.value
  const filteredBaseTokenNames = new Set()
  const filteredSemanticTokenNames = new Set()
  const filteredComponentTokenNames = new Set()
  const filteredComponents = new Set()

  filtered.forEach(token => {
    // 基础Token名称：只要名称不一样就算一个
    if (token.baseToken) filteredBaseTokenNames.add(token.baseToken)
    
    // 语义Token名称：只要名称不一样就算一个
    if (token.semanticToken) filteredSemanticTokenNames.add(token.semanticToken)
    
    // 组件Token名称：完整的组件Token名称（包含样式属性）
    if (token.componentToken) {
      filteredComponentTokenNames.add(token.componentToken)
    }
    
    // 组件名称
    if (token.componentName) {
      filteredComponents.add(token.componentName)
    }
  })

  return {
    baseTokenCount: filteredBaseTokenNames.size,
    semanticTokenCount: filteredSemanticTokenNames.size,
    componentTokenCount: filteredComponentTokenNames.size,
    componentCount: filteredComponents.size
  }
})

// 获取唯一值用于筛选器选项
// 基础数据集：基于当前已选筛选条件动态计算可用选项
const getFilteredData = (excludeFields = []) => {
  return allTokens.value.filter(token => {
    const checks = []
    
    if (!excludeFields.includes('componentName') && filters.value.componentName) {
      checks.push(token.componentName === filters.value.componentName)
    }
    if (!excludeFields.includes('variant') && filters.value.variant) {
      checks.push(token.variant === filters.value.variant)
    }
    if (!excludeFields.includes('state') && filters.value.state) {
      const tokenState = token.componentState || '不可交互'
      checks.push(tokenState === filters.value.state)
    }
    if (!excludeFields.includes('componentToken') && filters.value.componentToken) {
      checks.push(token.componentToken === filters.value.componentToken)
    }
    if (!excludeFields.includes('semanticToken') && filters.value.semanticToken) {
      checks.push(token.semanticToken === filters.value.semanticToken)
    }
    if (!excludeFields.includes('baseToken') && filters.value.baseToken) {
      checks.push(token.baseToken === filters.value.baseToken)
    }
    if (!excludeFields.includes('baseType') && filters.value.baseType) {
      checks.push(token.baseType === filters.value.baseType)
    }
    if (!excludeFields.includes('semanticType') && filters.value.semanticType) {
      checks.push(token.semanticType === filters.value.semanticType)
    }
    
    // Token名称筛选支持
    if (!excludeFields.includes('componentTokenName') && filters.value.componentTokenName) {
      const componentTokenName = token.componentToken ? token.componentToken.split('.')[1] : ''
      checks.push(componentTokenName === filters.value.componentTokenName)
    }
    if (!excludeFields.includes('semanticTokenName') && filters.value.semanticTokenName) {
      const semanticTokenName = token.semanticToken ? token.semanticToken.split('.')[1] : ''
      checks.push(semanticTokenName === filters.value.semanticTokenName)
    }
    if (!excludeFields.includes('baseTokenName') && filters.value.baseTokenName) {
      const baseTokenName = token.baseToken ? token.baseToken.split('.')[1] : ''
      checks.push(baseTokenName === filters.value.baseTokenName)
    }
    
    return checks.every(check => check)
  })
}

const uniqueComponentNames = computed(() => {
  const names = new Set()
  getFilteredData(['componentName']).forEach(token => {
    if (token.componentName) names.add(token.componentName)
  })
  return Array.from(names).sort()
})

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



const uniqueSemanticTypes = computed(() => {
  const types = new Set()
  getFilteredData(['semanticType']).forEach(token => {
    if (token.semanticType) types.add(token.semanticType)
  })
  return Array.from(types).sort()
})

const uniqueSemanticTokens = computed(() => {
  const tokens = new Set()
  getFilteredData(['semanticToken']).forEach(token => {
    if (token.semanticToken) tokens.add(token.semanticToken)
  })
  return Array.from(tokens).sort()
})

const uniqueBaseTypes = computed(() => {
  const types = new Set()
  getFilteredData(['baseType']).forEach(token => {
    if (token.baseType) types.add(token.baseType)
  })
  return Array.from(types).sort()
})

const uniqueBaseTokens = computed(() => {
  const tokens = new Set()
  getFilteredData(['baseToken']).forEach(token => {
    if (token.baseToken) tokens.add(token.baseToken)
  })
  return Array.from(tokens).sort()
})

// Token名称筛选器选项 - 显示全部Token名称
const uniqueComponentTokenNames = computed(() => {
  const names = new Set()
  allTokens.value.forEach(token => {
    if (token.componentToken) {
      const name = token.componentToken.split('.')[1]
      if (name) names.add(name)
    }
  })
  return Array.from(names).sort()
})

const uniqueSemanticTokenNames = computed(() => {
  const names = new Set()
  allTokens.value.forEach(token => {
    if (token.semanticToken) {
      const name = token.semanticToken.split('.')[1]
      if (name) names.add(name)
    }
  })
  return Array.from(names).sort()
})

const uniqueBaseTokenNames = computed(() => {
  const names = new Set()
  allTokens.value.forEach(token => {
    if (token.baseToken) {
      const name = token.baseToken.split('.')[1]
      if (name) names.add(name)
    }
  })
  return Array.from(names).sort()
})

// 添加缺失的uniqueComponentTokens计算属性
const uniqueComponentTokens = computed(() => {
  const tokens = new Set()
  getFilteredData(['componentToken']).forEach(token => {
    if (token.componentToken) {
      tokens.add(token.componentToken)
    }
  })
  return Array.from(tokens).sort()
})

const isEditable = (token) => {
  return token.baseToken && token.baseValue
}

const getValidationTip = (type) => {
  const tips = {
    color: '颜色值格式：#RRGGBB 或 rgb(r,g,b)',
    spacing: '间距值格式：数字+px/rem/em',
    typography: '字体大小格式：数字+px/rem/em',
    border: '边框值格式：数字+px'
  }
  return tips[type] || '点击编辑'
}

const startEdit = (index, value) => {
  editingIndex.value = index
  editingValue.value = value
  validationError.value = ''
}

const cancelEdit = () => {
  editingIndex.value = -1
  editingValue.value = ''
  validationError.value = ''
}

const validateValue = (value, type) => {
  if (!value) return '值不能为空'
  
  switch (type) {
    case 'color':
      const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/
      if (!colorRegex.test(value)) {
        return '颜色格式不正确，请使用 #RRGGBB 或 rgb(r,g,b) 格式'
      }
      break
    case 'spacing':
    case 'typography':
      const sizeRegex = /^\d+(\.\d+)?(px|rem|em)$/
      if (!sizeRegex.test(value)) {
        return '尺寸格式不正确，请使用数字+px/rem/em格式'
      }
      break
    case 'border':
      const borderRegex = /^\d+(\.\d+)?px$/
      if (!borderRegex.test(value)) {
        return '边框格式不正确，请使用数字+px格式'
      }
      break
  }
  return null
}

const saveEdit = (index) => {
  const token = filteredTokens.value[index]
  const error = validateValue(editingValue.value, token.baseType)
  
  if (error) {
    validationError.value = error
    return
  }

  // 更新Token值
  const [category, name] = token.baseToken.split('.')
  updateTokenValue(category, name, editingValue.value)
  
  // 重新加载数据
  // loadTokens() // This line is removed as per the edit hint.
  
  cancelEdit()
}

const revertRecord = (recordId) => {
  const result = revertHistoryRecord(recordId)
  if (result.success) {
    revertTipMessage.value = result.message
    showRevertTip.value = true
    setTimeout(() => {
      showRevertTip.value = false
    }, 3000)
    
    // 重新加载数据
    // loadTokens() // This line is removed as per the edit hint.
  }
}

// 中文标签处理函数
const getStateLabel = (state) => {
  const stateLabels = {
    'default': '默认',
    'hover': '悬停', 
    'active': '激活',
    'disabled': '禁用',
    'focus': '聚焦',
    'error': '错误'
  }
  return stateLabels[state] || state
}

const getStateClass = (state) => {
  const stateClasses = {
    'default': 'bg-gray-100 text-gray-700',
    'hover': 'bg-blue-100 text-blue-700',
    'active': 'bg-indigo-100 text-indigo-700', 
    'disabled': 'bg-gray-200 text-gray-500',
    'focus': 'bg-yellow-100 text-yellow-700',
    'error': 'bg-red-100 text-red-700'
  }
  return stateClasses[state] || 'bg-gray-100 text-gray-700'
}

const getBaseTypeLabel = (type) => {
  const typeLabels = {
    'color': '颜色',
    'spacing': '间距',
    'typography': '字体',
    'border': '边框'
  }
  return typeLabels[type] || type
}

const getSemanticTypeLabel = (type) => {
  const typeLabels = {
    'background': '背景色',
    'text': '文字色',
    'border': '边框色',
    'spacing': '空间距',
    'typography': '字体样'
  }
  return typeLabels[type] || type
}

const getBaseUsageLabel = (usage) => {
  // 基础Token用途 - 描述原始设计意图
  const usageMap = {
    '主色调': '品牌主色',
    '主色调深色': '品牌深色',
    '次要色调': '品牌辅色',
    '白色': '纯白背景',
    '浅灰色': '浅色填充',
    '灰色': '中性填充',
    '深灰色': '深色填充',
    '蓝色': '强调色',
    '浅红色': '错误浅色',
    '红色': '错误主色',
    '浅绿色': '成功浅色',
    '绿色': '成功主色',
    '最小间距': '微小留白',
    '小间距': '紧密留白',
    '中等间距': '标准留白',
    '标准间距': '常规留白',
    '大间距': '宽松留白',
    '超大间距': '极宽留白',
    '小字体': '辅助文字',
    '基础字体': '正文内容',
    '大字体': '标题内容',
    '超大字体': '主标题',
    '常规字重': '普通粗细',
    '粗体字重': '加粗效果',
    '小圆角': '轻微圆润',
    '中等圆角': '适中圆润',
    '大圆角': '明显圆润'
  }
  return usageMap[usage] || usage
}

const getSemanticUsageLabel = (usage) => {
  // 语义Token用途 - 描述使用场景
  const usageMap = {
    '主按钮背景色': '重要操作底色',
    '主按钮文字色': '重要操作文字',
    '主按钮悬停背景色': '重要操作悬停',
    '次要按钮背景色': '次要操作底色',
    '次要按钮文字色': '次要操作文字',
    '次要按钮边框色': '次要操作边框',
    '输入框背景色': '输入区域底色',
    '输入框边框色': '输入区域边框',
    '输入框文字色': '输入内容文字',
    '输入框聚焦边框色': '输入聚焦提示',
    '错误输入框背景色': '错误状态底色',
    '错误输入框边框色': '错误状态边框',
    '主要文字色': '核心信息文字',
    '次要文字色': '辅助信息文字',
    '主要背景色': '主要区域底色',
    '次要背景色': '次要区域底色',
    '主要边框色': '主要分割线',
    '次要边框色': '次要分割线',
    '超小间距': '元素内留白',
    '小间距': '相关元素间距',
    '中等间距': '组件内间距',
    '大间距': '区块间距',
    '正文字体大小': '内容阅读尺寸',
    '标题字体大小': '层级标题尺寸',
    '正文字重': '内容阅读粗细',
    '标题字重': '层级标题粗细',
    '小圆角': '细节装饰圆润',
    '中等圆角': '组件边缘圆润',
    '大圆角': '卡片边缘圆润',
    '小字体文字': '说明文字显示',
    '大字体文字': '重要标题显示',
    '中等间距': '适中元素间距',
    '大间距': '松散布局间距',
    '成功状态背景色': '成功反馈底色',
    '成功状态文字色': '成功反馈文字'
  }
  return usageMap[usage] || usage
}

const getComponentUsageLabel = (usage) => {
  // 组件Token用途 - 描述具体应用
  const usageMap = {
    '主按钮样式': '重要操作按钮',
    '主按钮文字样式': '重要按钮文字',
    '次要按钮样式': '普通操作按钮',
    '次要按钮文字样式': '普通按钮文字',
    '次要按钮边框样式': '普通按钮边框',
    '默认输入框样式': '标准输入框',
    '输入框边框样式': '输入框边线',
    '输入框文字样式': '输入框文本',
    '输入框聚焦边框样式': '输入框焦点边线',
    '错误输入框样式': '错误状态输入框',
    '错误输入框边框样式': '错误状态边线',
    '主要文字样式': '核心文本样式',
    '次要文字样式': '辅助文本样式',
    '主要背景样式': '主要区域样式',
    '次要背景样式': '次要区域样式',
    '主要边框样式': '主要分割样式',
    '次要边框样式': '次要分割样式',
    '超小间距样式': '紧密布局样式',
    '小间距样式': '相邻元素样式',
    '中等间距样式': '组件间距样式',
    '大间距样式': '区块间距样式',
    '正文字体样式': '内容文本样式',
    '标题字体样式': '标题文本样式',
    '正文字重样式': '正文粗细样式',
    '标题字重样式': '标题粗细样式',
    '小圆角样式': '细节圆角样式',
    '中等圆角样式': '组件圆角样式',
    '大圆角样式': '卡片圆角样式',
    '小字体文字样式': '说明文字样式',
    '大字体文字样式': '重要标题样式',
    '中等间距样式': '适中间距样式',
    '大间距样式': '宽松间距样式',
    '成功状态背景样式': '成功反馈样式',
    '成功状态文字样式': '成功文字样式'
  }
  return usageMap[usage] || usage
}

const getComponentNameLabel = (componentName) => {
  const nameLabels = {
    'button': '按钮',
    'input': '输入框',
    'common': '通用'
  }
  return nameLabels[componentName] || componentName
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

// CSV导入功能
const handleCSVImport = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const text = await file.text()
  const lines = text.split('\n')
  
  if (lines.length < 2) {
    alert('CSV文件格式不正确')
    return
  }

  try {
    // 解析CSV数据
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim())
    const data = []
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const row = lines[i].split(',').map(cell => cell.replace(/"/g, '').trim())
        if (row.length === headers.length) {
          const rowData = {}
          headers.forEach((header, index) => {
            rowData[header] = row[index]
          })
          data.push(rowData)
        }
      }
    }

    // 调用store中的函数来更新Token数据
    try {
      await importTokensFromCSV(data)
      alert(`🎉 成功导入 ${data.length} 条Token数据并重建关联关系！`)
    } catch (error) {
      alert('导入Token数据失败：' + error.message)
    }
    
    // 清空文件输入
    event.target.value = ''
    
  } catch (error) {
    alert('CSV文件解析失败：' + error.message)
  }
}

const downloadCSV = () => {
  const headers = [
    '组件', '变体', '状态', '组件Token', '组件用途', '语义类型', 
    '语义Token', '语义用途', '基础类型', '基础Token', '基础值', '基础用途'
  ]
  
  const csvContent = [
    headers.join(','),
    ...filteredTokens.value.map(token => [
      getComponentNameLabel(token.componentName) || '',
      getVariantLabel(token.variant) || '',
      token.componentState ? getStateLabel(token.componentState) : '不可交互',
      token.componentToken || '',
      getComponentUsageLabel(token.componentUsage) || '',
      getSemanticTypeLabel(token.semanticType) || '',
      token.semanticToken || '',
      getSemanticUsageLabel(token.semanticUsage) || '',
      getBaseTypeLabel(token.baseType) || '',
      token.baseToken || '',
      token.baseValue || '',
      getBaseUsageLabel(token.baseUsage) || ''
    ].map(cell => `"${cell}"`).join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'design-tokens.csv'
  link.click()
}

onMounted(() => {
  // 组件已挂载，computed会自动计算数据
})
</script> 