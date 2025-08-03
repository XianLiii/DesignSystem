<template>
  <section class="mb-8">
    <h2 class="text-xl font-bold mb-6">{{ title }}</h2>
    <div class="flex flex-wrap gap-6 justify-start">
      <div 
        v-for="stat in displayStats" 
        :key="stat.key" 
        class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 text-center min-w-[140px]"
      >
        <div 
          class="text-4xl md:text-5xl lg:text-6xl font-bold mb-3"
          :class="stat.numberColorClass"
        >
          {{ stat.value }}
        </div>
        <div class="text-sm font-medium text-gray-600">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { tokenStats } from '../stores/tokenStore'

const props = defineProps({
  title: {
    type: String,
    default: 'Token统计'
  },
  // 指定显示哪些统计项，如果不指定则显示所有
  statsToShow: {
    type: Array,
    default: () => ['componentCount', 'variantCount', 'componentTokenCount', 'semanticTokenCount', 'baseTokenCount']
  },
  // 自定义统计数据（用于组件页面）
  customStats: {
    type: Object,
    default: null
  }
})

// 统计项配置
const statsConfig = {
  componentCount: {
    label: '组件数',
    numberColorClass: 'text-gray-800'
  },
  variantCount: {
    label: '变体数',
    numberColorClass: 'text-orange-600'
  },
  componentTokenCount: {
    label: '组件Token数',
    numberColorClass: 'text-purple-600'
  },
  semanticTokenCount: {
    label: '语义Token数',
    numberColorClass: 'text-blue-600'
  },
  baseTokenCount: {
    label: '基础Token数',
    numberColorClass: 'text-green-600'
  }
}

// 计算要显示的统计数据
const displayStats = computed(() => {
  const sourceStats = props.customStats || tokenStats.value
  
  return props.statsToShow.map(key => ({
    key,
    label: statsConfig[key].label,
    numberColorClass: statsConfig[key].numberColorClass,
    value: sourceStats[key] || 0
  }))
})
</script>