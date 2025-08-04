<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-8">Design Token 系统完全指南</h1>
    
    <!-- Token 统计信息 -->
    <TokenStats 
      title="Token 总体统计"
      :stats-to-show="['componentCount', 'variantCount', 'componentTokenCount', 'semanticTokenCount', 'baseTokenCount']"
    />

    <!-- 角色导航 -->
    <div class="mb-8 flex gap-4 flex-wrap">
      <button 
        v-for="role in roles" 
        :key="role.id"
        @click="activeRole = role.id"
        :class="[
          'px-6 py-3 rounded-lg font-medium transition-all',
          activeRole === role.id 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        ]"
      >
        {{ role.name }}
      </button>
    </div>

    <!-- 什么是Design Token系统 -->
    <section v-if="activeRole === 'all'" class="mb-12">
      <h2 class="text-2xl font-bold mb-6">什么是 Design Token 系统？</h2>
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">核心概念</h3>
            <p class="text-gray-700 mb-4">
              Design Token 是设计系统中的最小设计决策单元，它将设计属性（如颜色、间距、字体等）以变量的形式存储，
              确保设计与开发的一致性。通过三层架构，我们可以灵活管理和扩展设计系统。
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">三层架构</h3>
            <div class="space-y-4">
              <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold text-blue-900 mb-2">1. 基础Token (Base Tokens)</h4>
                <p class="text-sm text-blue-800 mb-2">原始设计值，不包含任何使用场景信息</p>
                <p class="text-sm text-gray-600">例如：#1890FF（蓝色）、16px（间距）、300ms（动画时长）</p>
              </div>
              
              <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-semibold text-green-900 mb-2">2. 语义Token (Semantic Tokens)</h4>
                <p class="text-sm text-green-800 mb-2">赋予基础Token使用意义，定义在什么场景下使用</p>
                <p class="text-sm text-gray-600">例如：primary-text（主文本色）、card-padding（卡片内边距）</p>
              </div>
              
              <div class="bg-purple-50 p-4 rounded-lg">
                <h4 class="font-semibold text-purple-900 mb-2">3. 组件Token (Component Tokens)</h4>
                <p class="text-sm text-purple-800 mb-2">特定组件的完整样式定义，组合多个语义Token</p>
                <p class="text-sm text-gray-600">例如：button-primary-default（主按钮默认状态的完整样式）</p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">系统优势</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li>保持设计一致性：所有组件使用相同的设计基础</li>
              <li>提高开发效率：开发者直接使用定义好的Token</li>
              <li>便于主题切换：修改基础Token即可改变整体风格</li>
              <li>降低沟通成本：设计师和开发者使用同一套语言</li>
              <li>易于维护扩展：层级清晰，修改影响范围可控</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 领导视角 -->
    <section v-if="activeRole === 'leader'" class="mb-12">
      <h2 class="text-2xl font-bold mb-6">管理层视角：Design Token 的商业价值</h2>
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold mb-4">投资回报率（ROI）</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-900 mb-2">成本降低</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• 减少设计返工：统一的设计语言减少误解</li>
                <li>• 降低开发时间：复用Token而非重复编码</li>
                <li>• 简化品牌升级：一处修改，全局生效</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-900 mb-2">效率提升</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• 设计到开发周期缩短30-50%</li>
                <li>• 新功能开发速度提升40%</li>
                <li>• 跨团队协作效率提升60%</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold mb-4">品牌一致性保障</h3>
          <p class="text-gray-700 mb-4">
            通过Token系统，确保所有产品线、所有平台的视觉体验完全一致，增强品牌识别度和用户信任感。
          </p>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-700">
              <strong>案例：</strong>某企业通过实施Token系统，将多产品线的视觉一致性从60%提升到95%，
              用户满意度提升15%，品牌认知度提升25%。
            </p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold mb-4">关键指标监控</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl font-bold text-blue-600">{{ tokenStats.baseTokenCount }}</div>
              <div class="text-sm text-gray-600">基础设计元素</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl font-bold text-green-600">{{ tokenStats.semanticTokenCount }}</div>
              <div class="text-sm text-gray-600">语义化定义</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl font-bold text-purple-600">{{ tokenStats.componentTokenCount }}</div>
              <div class="text-sm text-gray-600">组件样式变体</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 设计师视角 -->
    <section v-if="activeRole === 'designer'" class="mb-12">
      <h2 class="text-2xl font-bold mb-6">设计师指南：如何定义和管理 Token</h2>
      <div class="space-y-6">
        <!-- 基础Token定义指南 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold mb-4">基础Token定义指南</h3>
          <div class="space-y-4">
            <div v-for="tokenType in baseTokenTypes" :key="tokenType.type" class="border-l-4 border-blue-500 pl-4">
              <h4 class="font-semibold text-gray-800 mb-2">{{ tokenType.name }}</h4>
              <p class="text-sm text-gray-600 mb-2">{{ tokenType.description }}</p>
              <div class="bg-gray-50 p-3 rounded text-sm">
                <p class="font-medium mb-1">命名规范：</p>
                <code class="text-xs bg-gray-200 px-2 py-1 rounded">{{ tokenType.naming }}</code>
                <div class="mt-2">
                  <p class="font-medium mb-1">示例：</p>
                  <ul class="list-disc list-inside text-gray-600">
                    <li v-for="example in tokenType.examples" :key="example">{{ example }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 设计决策流程 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold mb-4">设计决策流程</h3>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
              <div>
                <h4 class="font-semibold">定义基础值</h4>
                <p class="text-sm text-gray-600">确定颜色、间距、字体等原始设计值</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
              <div>
                <h4 class="font-semibold">赋予语义</h4>
                <p class="text-sm text-gray-600">为基础值定义使用场景和意义</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
              <div>
                <h4 class="font-semibold">组合成组件</h4>
                <p class="text-sm text-gray-600">将语义Token组合成完整的组件样式</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
              <div>
                <h4 class="font-semibold">验证一致性</h4>
                <p class="text-sm text-gray-600">确保Token在各种场景下表现一致</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 实用工具 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold mb-4">实用工具和技巧</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-900 mb-2">Token命名检查清单</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>✓ 名称是否清晰表达用途？</li>
                <li>✓ 是否遵循团队命名规范？</li>
                <li>✓ 是否避免了技术实现细节？</li>
                <li>✓ 是否具有良好的扩展性？</li>
              </ul>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-900 mb-2">常见错误避免</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>✗ 避免使用具体数值命名（如color-255）</li>
                <li>✗ 避免过度细分Token</li>
                <li>✗ 避免创建重复功能的Token</li>
                <li>✗ 避免硬编码特定组件名称</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 开发者视角 -->
    <section v-if="activeRole === 'developer'" class="mb-12">
      <h2 class="text-2xl font-bold mb-6">开发者指南：如何使用 Token 系统</h2>
      <div class="space-y-6">
        <!-- 快速开始 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold mb-4">快速开始</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold mb-2">1. 理解Token层级</h4>
              <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                <div class="mb-2">
                  <span class="text-green-400">// 基础Token - 原始值</span><br/>
                  baseTokens.color['blue-500'] = '#1890FF'
                </div>
                <div class="mb-2">
                  <span class="text-green-400">// 语义Token - 使用场景</span><br/>
                  semanticTokens.text['primary-text'] = baseTokens.color['gray-900']
                </div>
                <div>
                  <span class="text-green-400">// 组件Token - 完整样式</span><br/>
                  componentTokens.button['button-primary-default'] = {<br/>
                  &nbsp;&nbsp;background: semanticTokens.surface['primary-surface'],<br/>
                  &nbsp;&nbsp;color: semanticTokens.text['primary-text-on-color'],<br/>
                  &nbsp;&nbsp;padding: semanticTokens.spacing['compact-padding']<br/>
                  }
                </div>
              </div>
            </div>

            <div>
              <h4 class="font-semibold mb-2">2. 使用Token的最佳实践</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-green-50 p-4 rounded-lg">
                  <p class="font-semibold text-green-900 mb-2">✓ 推荐做法</p>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>• 优先使用组件Token</li>
                    <li>• 需要时使用语义Token</li>
                    <li>• 避免直接使用基础Token</li>
                    <li>• 保持Token引用的一致性</li>
                  </ul>
                </div>
                <div class="bg-red-50 p-4 rounded-lg">
                  <p class="font-semibold text-red-900 mb-2">✗ 避免做法</p>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li>• 硬编码样式值</li>
                    <li>• 混用Token和硬编码值</li>
                    <li>• 创建临时的局部Token</li>
                    <li>• 跨层级直接引用</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 实际应用示例 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold mb-4">实际应用示例</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold mb-2">Vue组件中使用Token</h4>
              <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>&lt;template&gt;
  &lt;button :class="buttonClasses" @click="handleClick"&gt;
    {{ label }}
  &lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { computed } from 'vue'
import { componentTokens } from '@/stores/tokenStore'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'medium' },
  state: { type: String, default: 'default' }
})

const buttonClasses = computed(() => {
  const tokenKey = `button-${props.variant}-${props.size}-${props.state}`
  const token = componentTokens.button[tokenKey]
  
  return {
    backgroundColor: token.styles.backgroundColor,
    color: token.styles.color,
    padding: token.styles.padding,
    borderRadius: token.styles.borderRadius,
    // ... 其他样式
  }
})
&lt;/script&gt;</pre>
              </div>
            </div>

            <div>
              <h4 class="font-semibold mb-2">动态主题切换</h4>
              <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                <pre>// 修改基础Token实现主题切换
function switchToDarkTheme() {
  baseTokens.color['gray-50'] = '#1a1a1a'
  baseTokens.color['gray-900'] = '#ffffff'
  // 语义Token和组件Token会自动更新
}</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- API参考 -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold mb-4">Token API 参考</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">方法</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">描述</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">示例</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-4 py-2 text-sm font-mono">getAllTokens()</td>
                  <td class="px-4 py-2 text-sm">获取所有Token的扁平化数据</td>
                  <td class="px-4 py-2 text-sm font-mono">const tokens = getAllTokens()</td>
                </tr>
                <tr>
                  <td class="px-4 py-2 text-sm font-mono">getComponentToken(name)</td>
                  <td class="px-4 py-2 text-sm">获取特定组件Token</td>
                  <td class="px-4 py-2 text-sm font-mono">getComponentToken('button-primary-default')</td>
                </tr>
                <tr>
                  <td class="px-4 py-2 text-sm font-mono">updateTokenValue()</td>
                  <td class="px-4 py-2 text-sm">更新Token值（开发环境）</td>
                  <td class="px-4 py-2 text-sm font-mono">updateTokenValue('color', 'blue-500', '#0066CC')</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Token 命名规范（通用部分） -->
    <section class="mb-12">
      <h2 class="text-xl font-bold mb-6">Token 命名规范详解</h2>
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div class="space-y-6">
          <!-- 基础 Token 命名规范 -->
          <div>
            <h3 class="text-lg font-semibold mb-3">基础Token (Base Tokens)</h3>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-700 mb-2"><strong>格式：</strong> 类型-特征-规格</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div v-for="category in baseTokenCategories" :key="category.type">
                  <p class="text-sm font-medium text-gray-700">{{ category.name }}</p>
                  <ul class="list-disc list-inside ml-4 text-sm text-gray-600 space-y-1">
                    <li v-for="example in category.examples" :key="example">{{ example }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 语义 Token 命名规范 -->
          <div>
            <h3 class="text-lg font-semibold mb-3">语义Token (Semantic Tokens)</h3>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-700 mb-2"><strong>格式：</strong> 类别.用途-状态</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div v-for="category in semanticTokenCategories" :key="category.type">
                  <p class="text-sm font-medium text-gray-700">{{ category.name }}</p>
                  <ul class="list-disc list-inside ml-4 text-sm text-gray-600 space-y-1">
                    <li v-for="example in category.examples" :key="example">{{ example }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 组件 Token 命名规范 -->
          <div>
            <h3 class="text-lg font-semibold mb-3">组件Token (Component Tokens)</h3>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-700 mb-2"><strong>格式：</strong> 组件-变体-尺寸-状态</p>
              <div class="space-y-4 mt-3">
                <div v-for="component in componentTokenExamples" :key="component.name">
                  <p class="text-sm font-medium text-gray-700">{{ component.name }}</p>
                  <ul class="list-disc list-inside ml-4 text-sm text-gray-600 space-y-1">
                    <li v-for="example in component.examples" :key="example">{{ example }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TokenStats from './TokenStats.vue'
import { tokenStats } from '../stores/tokenStore'

// 角色定义
const roles = [
  { id: 'all', name: '概览' },
  { id: 'leader', name: '管理层' },
  { id: 'designer', name: '设计师' },
  { id: 'developer', name: '开发者' }
]

const activeRole = ref('all')

// 基础Token类型定义
const baseTokenTypes = [
  {
    type: 'color',
    name: '颜色 (Color)',
    description: '定义品牌色彩体系，包括主色、辅助色、中性色等',
    naming: '色系-明度值 或 用途-深浅',
    examples: ['gray-50 - 最浅灰色', 'blue-500 - 品牌蓝主色', 'red-600 - 错误深色']
  },
  {
    type: 'spacing',
    name: '间距 (Spacing)',
    description: '定义元素之间的空间关系，确保布局的一致性',
    naming: 'space-尺寸标识',
    examples: ['space-xs - 4px超小间距', 'space-md - 16px中等间距', 'space-xl - 32px超大间距']
  },
  {
    type: 'typography',
    name: '字体 (Typography)',
    description: '定义文字的大小、行高、字重等排版属性',
    naming: 'font-属性-值',
    examples: ['font-size-sm - 14px小字号', 'font-weight-bold - 700粗体', 'line-height-normal - 1.5倍行高']
  },
  {
    type: 'border',
    name: '边框 (Border)',
    description: '定义边框的宽度、圆角等属性',
    naming: 'border-属性-值',
    examples: ['border-radius-sm - 2px小圆角', 'border-width-medium - 2px中等边框', 'border-radius-full - 50%全圆角']
  },
  {
    type: 'shadow',
    name: '阴影 (Shadow)',
    description: '定义元素的投影效果，创造层次感',
    naming: 'shadow-强度',
    examples: ['shadow-sm - 细微阴影', 'shadow-md - 中等阴影', 'shadow-xl - 强烈阴影']
  },
  {
    type: 'animation',
    name: '动画 (Animation)',
    description: '定义动画的时长、缓动函数等',
    naming: '动画属性-值',
    examples: ['duration-fast - 150ms快速', 'duration-normal - 300ms标准', 'easing-ease-in-out - 渐入渐出']
  },
  {
    type: 'sizing',
    name: '尺寸 (Sizing)',
    description: '定义组件的固定尺寸值',
    naming: 'size-尺寸标识',
    examples: ['size-xs - 24px超小尺寸', 'size-md - 40px中等尺寸', 'size-xl - 56px超大尺寸']
  },
  {
    type: 'opacity',
    name: '透明度 (Opacity)',
    description: '定义元素的透明度级别',
    naming: 'opacity-百分比',
    examples: ['opacity-0 - 完全透明', 'opacity-50 - 半透明', 'opacity-100 - 完全不透明']
  }
]

// 基础Token分类（用于命名规范展示）
const baseTokenCategories = [
  {
    type: 'color',
    name: '颜色 (colors)',
    examples: ['gray-50 - 灰色系-明度50', 'blue-500 - 蓝色系-主色调', 'red-600 - 红色系-深色调']
  },
  {
    type: 'spacing',
    name: '间距 (spacing)',
    examples: ['space-xs - 超小间距', 'space-md - 中等间距', 'space-xl - 超大间距']
  },
  {
    type: 'typography',
    name: '字体 (typography)',
    examples: ['font-size-sm - 小字号', 'font-weight-bold - 粗体', 'line-height-tight - 紧凑行高']
  },
  {
    type: 'border',
    name: '边框 (border)',
    examples: ['border-radius-sm - 小圆角', 'border-width-thin - 细边框', 'border-radius-lg - 大圆角']
  },
  {
    type: 'shadow',
    name: '阴影 (shadow)',
    examples: ['shadow-sm - 细微阴影', 'shadow-md - 中等阴影', 'shadow-xl - 强烈阴影']
  },
  {
    type: 'animation',
    name: '动画 (animation)',
    examples: ['duration-fast - 快速时长', 'duration-slow - 慢速时长', 'easing-linear - 线性缓动']
  },
  {
    type: 'sizing',
    name: '尺寸 (sizing)',
    examples: ['size-xs - 超小尺寸', 'size-md - 中等尺寸', 'size-xl - 超大尺寸']
  },
  {
    type: 'opacity',
    name: '透明度 (opacity)',
    examples: ['opacity-25 - 25%透明度', 'opacity-75 - 75%透明度', 'opacity-100 - 不透明']
  }
]

// 语义Token分类
const semanticTokenCategories = [
  {
    type: 'surface',
    name: '表面色彩 (surface)',
    examples: ['surface.primary-surface - 主要表面', 'surface.secondary-surface - 次要表面', 'surface.disabled-surface - 禁用表面']
  },
  {
    type: 'text',
    name: '文本颜色 (text)',
    examples: ['text.primary-text - 主要文本', 'text.secondary-text - 次要文本', 'text.error-text - 错误文本']
  },
  {
    type: 'border',
    name: '边框样式 (border)',
    examples: ['border.default-border - 默认边框', 'border.focus-border - 聚焦边框', 'border.error-border - 错误边框']
  },
  {
    type: 'spacing',
    name: '空间距离 (spacing)',
    examples: ['spacing.compact-padding - 紧凑内边距', 'spacing.normal-margin - 标准外边距', 'spacing.section-gap - 区块间距']
  },
  {
    type: 'shadow',
    name: '阴影效果 (shadow)',
    examples: ['shadow.subtle-shadow - 细微阴影', 'shadow.elevated-shadow - 提升阴影', 'shadow.prominent-shadow - 显著阴影']
  },
  {
    type: 'animation',
    name: '动画效果 (animation)',
    examples: ['animation.quick-transition - 快速过渡', 'animation.smooth-transition - 平滑过渡', 'animation.standard-easing - 标准缓动']
  }
]

// 组件Token示例
const componentTokenExamples = [
  {
    name: '按钮组件 (button)',
    examples: [
      'button-primary-default - 主按钮默认状态',
      'button-primary-hover - 主按钮悬停状态',
      'button-secondary-small-default - 次要小按钮默认状态',
      'button-ghost-large-disabled - 幽灵大按钮禁用状态'
    ]
  },
  {
    name: '输入框组件 (input)',
    examples: [
      'input-standard-default - 标准输入框默认',
      'input-standard-focus - 标准输入框聚焦',
      'input-small-error - 小输入框错误状态',
      'input-large-disabled - 大输入框禁用状态'
    ]
  }
]
</script>