<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Table 组件</h1>
    
    <!-- Token统计 -->
    <TokenStats 
      title="Table Token 统计"
      :custom-stats="tableStats"
      :stats-to-show="['componentCount', 'variantCount', 'componentTokenCount']"
    />

    <!-- 示例表格 -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">表格示例</h2>
      
      <!-- 标准表格 -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-3">标准表格</h3>
        <div class="overflow-x-auto">
          <table class="w-full" :style="getTableStyles('standard')">
            <thead>
              <tr :style="getHeaderRowStyles('standard')">
                <th v-for="header in tableHeaders" :key="header.key" 
                    :style="getHeaderCellStyles('standard')"
                    class="text-left">
                  {{ header.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in tableData" :key="row.id"
                  :style="getBodyRowStyles('standard', rowIndex)">
                <td v-for="header in tableHeaders" :key="`${row.id}-${header.key}`"
                    :style="getCellStyles('standard', row[header.key].type, row[header.key].edited)">
                  <div v-if="row[header.key].type === 'readonly'" class="cell-content">
                    {{ row[header.key].value }}
                  </div>
                  <div v-else-if="row[header.key].type === 'disabled'" class="cell-content opacity-50">
                    {{ row[header.key].value }}
                  </div>
                  <div v-else-if="row[header.key].type === 'editable'" class="cell-content">
                    <input
                      v-if="editingCell === `${row.id}-${header.key}`"
                      v-model="editingValue"
                      @blur="saveEdit(row.id, header.key)"
                      @keyup.enter="saveEdit(row.id, header.key)"
                      @keyup.esc="cancelEdit"
                      :style="getInputStyles('standard')"
                      class="w-full outline-none bg-transparent"
                      ref="editInput"
                    />
                    <span v-else 
                          @click="startEdit(row.id, header.key, row[header.key].value)"
                          class="cursor-pointer hover:opacity-80">
                      {{ row[header.key].value }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 紧凑型表格 -->
      <div class="mb-6">
        <h3 class="text-lg font-medium mb-3">紧凑型表格</h3>
        <div class="overflow-x-auto">
          <table class="w-full" :style="getTableStyles('compact')">
            <thead>
              <tr :style="getHeaderRowStyles('compact')">
                <th v-for="header in tableHeaders" :key="header.key" 
                    :style="getHeaderCellStyles('compact')"
                    class="text-left">
                  {{ header.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in compactTableData" :key="row.id"
                  :style="getBodyRowStyles('compact', rowIndex)">
                <td v-for="header in tableHeaders" :key="`${row.id}-${header.key}`"
                    :style="getCellStyles('compact', row[header.key].type, row[header.key].edited)">
                  <div class="cell-content">
                    {{ row[header.key].value }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 状态展示 -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">单元格状态</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="state in cellStates" :key="state.type" class="bg-white p-4 rounded-lg shadow">
          <h3 class="font-medium mb-2">{{ state.label }}</h3>
          <div class="border rounded p-3" :style="getCellStyles('standard', state.type, state.edited)">
            <div v-if="state.type === 'editable'" class="cursor-pointer">
              {{ state.value }}
            </div>
            <div v-else-if="state.type === 'disabled'" class="opacity-50">
              {{ state.value }}
            </div>
            <div v-else>
              {{ state.value }}
            </div>
          </div>
          <p class="text-sm text-gray-600 mt-2">{{ state.description }}</p>
        </div>
      </div>
    </section>

    <!-- Token 列表 -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Table Token 配置</h2>
      <TokenTable 
        :tokens="tableTokenList" 
        component-name="table"
      />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { componentTokens } from '../stores/tokenStore'
import TokenTable from './TokenTable.vue'
import TokenStats from './TokenStats.vue'

// 表格数据
const tableHeaders = [
  { key: 'name', label: '姓名' },
  { key: 'age', label: '年龄' },
  { key: 'email', label: '邮箱' },
  { key: 'status', label: '状态' }
]

const tableData = ref([
  {
    id: 1,
    name: { value: '张三', type: 'readonly', edited: false },
    age: { value: '28', type: 'editable', edited: false },
    email: { value: 'zhangsan@example.com', type: 'editable', edited: false },
    status: { value: '已激活', type: 'readonly', edited: false }
  },
  {
    id: 2,
    name: { value: '李四', type: 'readonly', edited: false },
    age: { value: '32', type: 'editable', edited: true },
    email: { value: 'lisi@example.com', type: 'disabled', edited: false },
    status: { value: '待审核', type: 'editable', edited: false }
  },
  {
    id: 3,
    name: { value: '王五', type: 'readonly', edited: false },
    age: { value: '25', type: 'disabled', edited: false },
    email: { value: 'wangwu@example.com', type: 'editable', edited: true },
    status: { value: '已禁用', type: 'disabled', edited: false }
  }
])

const compactTableData = ref([
  {
    id: 1,
    name: { value: '产品A', type: 'readonly', edited: false },
    age: { value: '￥299', type: 'readonly', edited: false },
    email: { value: '100', type: 'readonly', edited: false },
    status: { value: '在售', type: 'readonly', edited: false }
  },
  {
    id: 2,
    name: { value: '产品B', type: 'readonly', edited: false },
    age: { value: '￥199', type: 'readonly', edited: false },
    email: { value: '50', type: 'readonly', edited: false },
    status: { value: '缺货', type: 'readonly', edited: false }
  }
])

// 编辑状态
const editingCell = ref(null)
const editingValue = ref('')

// 单元格状态示例
const cellStates = [
  {
    type: 'readonly',
    label: '只读单元格',
    value: '只读内容',
    description: '不可编辑的单元格',
    edited: false
  },
  {
    type: 'editable',
    label: '可编辑单元格',
    value: '点击编辑',
    description: '点击后可以编辑内容',
    edited: false
  },
  {
    type: 'disabled',
    label: '禁用单元格',
    value: '禁用内容',
    description: '不可交互的单元格',
    edited: false
  },
  {
    type: 'editable',
    label: '已编辑单元格',
    value: '已修改内容',
    description: '编辑后的特殊样式',
    edited: true
  }
]

// 编辑功能
const startEdit = (rowId, field, value) => {
  editingCell.value = `${rowId}-${field}`
  editingValue.value = value
  nextTick(() => {
    const input = document.querySelector('input[ref="editInput"]')
    if (input) input.focus()
  })
}

const saveEdit = (rowId, field) => {
  const row = tableData.value.find(r => r.id === rowId)
  if (row && row[field]) {
    row[field].value = editingValue.value
    row[field].edited = true
  }
  cancelEdit()
}

const cancelEdit = () => {
  editingCell.value = null
  editingValue.value = ''
}

// 获取样式函数
const getTableStyles = (variant) => {
  const token = componentTokens.table?.[`table-${variant}-default`]
  if (!token) return {}
  
  return {
    borderCollapse: 'collapse',
    ...token.styles
  }
}

const getHeaderRowStyles = (variant) => {
  const token = componentTokens.table?.[`table-${variant}-header-row`]
  if (!token) return {}
  return token.styles
}

const getHeaderCellStyles = (variant) => {
  const token = componentTokens.table?.[`table-${variant}-header-cell`]
  if (!token) return {}
  return token.styles
}

const getBodyRowStyles = (variant, index) => {
  const baseToken = componentTokens.table?.[`table-${variant}-body-row`]
  const stripeToken = componentTokens.table?.[`table-${variant}-body-row-stripe`]
  
  if (!baseToken) return {}
  
  // 偶数行使用条纹样式
  if (index % 2 === 1 && stripeToken) {
    return stripeToken.styles
  }
  
  return baseToken.styles
}

const getCellStyles = (variant, cellType, edited) => {
  let tokenKey = `table-${variant}-cell-${cellType}`
  
  // 如果是已编辑的可编辑单元格，使用特殊样式
  if (cellType === 'editable' && edited) {
    tokenKey = `table-${variant}-cell-edited`
  }
  
  const token = componentTokens.table?.[tokenKey]
  if (!token) return {}
  
  return token.styles
}

const getInputStyles = (variant) => {
  const token = componentTokens.table?.[`table-${variant}-cell-input`]
  if (!token) return {}
  return token.styles
}

// 计算统计数据
const tableStats = computed(() => {
  const tableTokens = Object.entries(componentTokens.table || {})
  const variants = new Set()
  
  tableTokens.forEach(([key]) => {
    const parts = key.split('-')
    if (parts[1]) {
      variants.add(parts[1])
    }
  })
  
  return {
    componentCount: 1,
    variantCount: variants.size,
    componentTokenCount: tableTokens.length
  }
})

// Token列表
const tableTokenList = computed(() => {
  const tokens = []
  const tableTokens = componentTokens.table || {}
  
  Object.entries(tableTokens).forEach(([key, value]) => {
    if (value.styles) {
      Object.entries(value.styles).forEach(([styleProp, styleValue]) => {
        tokens.push({
          componentName: 'table',
          variant: value.variant || '',
          componentState: value.state || 'default',
          componentToken: `table.${key}`,
          componentUsage: value.usage || '',
          semanticType: styleValue.semanticType || '',
          semanticToken: styleValue.semanticToken || '',
          semanticUsage: styleValue.semanticUsage || '',
          baseType: styleValue.baseType || '',
          baseToken: styleValue.baseToken || '',
          baseValue: styleValue.baseValue || '',
          baseUsage: styleValue.baseUsage || ''
        })
      })
    }
  })
  
  return tokens
})
</script>

<style scoped>
.cell-content {
  min-height: 1.5rem;
  display: flex;
  align-items: center;
}
</style>