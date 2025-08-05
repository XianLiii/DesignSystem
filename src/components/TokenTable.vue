<template>
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
          v-for="(token, index) in tokens" 
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
          
          <!-- 组件用途 -->
          <td class="px-1 py-1.5 text-gray-600">
            {{ token.componentUsage || '-' }}
          </td>
          
          <!-- 语义类型 -->
          <td class="px-1 py-1.5">
            <span v-if="token.semanticType" 
                  class="inline-block bg-green-100 text-green-800 px-1 py-0.5 rounded text-xs font-medium">
              {{ getSemanticTypeLabel(token.semanticType) }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </td>
          
          <!-- 语义Token名称 -->
          <td class="px-1 py-1.5">
            <span v-if="token.semanticToken" 
                  class="inline-block bg-green-100 text-green-800 px-1 py-0.5 rounded text-xs font-medium">
              {{ token.semanticToken }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </td>
          
          <!-- 语义用途 -->
          <td class="px-1 py-1.5 text-gray-600">
            {{ token.semanticUsage || '-' }}
          </td>
          
          <!-- 基础类型 -->
          <td class="px-1 py-1.5">
            <span v-if="token.baseType" 
                  class="inline-block bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-xs font-medium">
              {{ getBaseTypeLabel(token.baseType) }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </td>
          
          <!-- 基础Token名称 -->
          <td class="px-1 py-1.5">
            <span v-if="token.baseToken" 
                  class="inline-block bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-xs font-medium">
              {{ token.baseToken }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </td>
          
          <!-- 基础值 -->
          <td class="px-1 py-1.5">
            <span v-if="token.baseValue" 
                  class="inline-block bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-xs font-medium">
              {{ token.baseValue }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </td>
          
          <!-- 基础用途 -->
          <td class="px-1 py-1.5 text-gray-600">
            {{ token.baseUsage || '-' }}
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tokens: {
    type: Array,
    required: true
  },
  componentName: {
    type: String,
    default: ''
  }
})

// 中文标签处理函数
const getStateLabel = (state) => {
  const stateLabels = {
    'default': '默认',
    'hover': '悬停', 
    'active': '激活',
    'disabled': '禁用',
    'focus': '聚焦',
    'error': '错误',
    'success': '成功',
    'readonly': '只读',
    'editable': '可编辑',
    'edited': '已编辑',
    'editing': '编辑中',
    'stripe': '条纹'
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
    'error': 'bg-red-100 text-red-700',
    'success': 'bg-green-100 text-green-700',
    'readonly': 'bg-gray-100 text-gray-700',
    'editable': 'bg-blue-100 text-blue-700',
    'edited': 'bg-yellow-100 text-yellow-700',
    'editing': 'bg-green-100 text-green-700',
    'stripe': 'bg-purple-100 text-purple-700'
  }
  return stateClasses[state] || 'bg-gray-100 text-gray-700'
}

const getBaseTypeLabel = (type) => {
  const typeLabels = {
    'color': '颜色',
    'spacing': '间距',
    'typography': '字体',
    'border': '边框',
    'shadow': '阴影',
    'animation': '动画',
    'sizing': '尺寸',
    'opacity': '透明度'
  }
  return typeLabels[type] || type
}

const getSemanticTypeLabel = (type) => {
  const typeLabels = {
    'background': '背景色',
    'text': '文字色',
    'border': '边框色',
    'spacing': '空间距',
    'typography': '字体样',
    'shadow': '阴影效',
    'animation': '动画效',
    'sizing': '尺寸值',
    'opacity': '透明度',
    'radius': '圆角'
  }
  return typeLabels[type] || type
}

const getComponentNameLabel = (name) => {
  const nameLabels = {
    'button': '按钮',
    'input': '输入框',
    'table': '表格',
    'common': '通用'
  }
  return nameLabels[name] || name
}

const getVariantLabel = (variant) => {
  const variantLabels = {
    'primary': '主要',
    'secondary': '次要',
    'ghost': '幽灵',
    'standard': '标准',
    'small': '小尺寸',
    'large': '大尺寸',
    'compact': '紧凑'
  }
  return variantLabels[variant] || variant
}
</script>