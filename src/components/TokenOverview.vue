<template>
  <div class="p-8 max-w-6xl">
    <h1 class="text-3xl font-bold mb-8">Design Token概述</h1>
    
    <div class="space-y-8">
      <!-- Token统计 -->
      <TokenStats 
        title="Token统计"
        :stats-to-show="['componentCount', 'componentTokenCount', 'semanticTokenCount', 'baseTokenCount']"
      />

      <!-- 三层架构说明 -->
      <section>
        <h2 class="text-xl font-bold mb-6">三层Token架构关系</h2>
        <div class="bg-gray-50 p-6 rounded-lg">
          <div class="space-y-6">
            <div class="flex items-center space-x-4">
              <div class="w-4 h-4 bg-green-500 rounded"></div>
              <div>
                <h3 class="font-bold text-green-800">基础Token (Base Tokens)</h3>
                <p class="text-sm text-gray-600">与上下文无关的属性值，如颜色、字体、间距等</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="w-4 h-4 bg-blue-500 rounded"></div>
              <div>
                <h3 class="font-bold text-blue-800">语义Token (Semantic Tokens)</h3>
                <p class="text-sm text-gray-600">基于使用场景定义，只能引用基础Token</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="w-4 h-4 bg-purple-500 rounded"></div>
              <div>
                <h3 class="font-bold text-purple-800">组件Token (Component Tokens)</h3>
                <p class="text-sm text-gray-600">直接应用于组件，只能引用语义Token</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 架构图 -->
      <section>
        <h2 class="text-xl font-bold mb-6">Token引用关系图</h2>
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- 基础Token -->
            <div class="text-center">
              <div class="bg-green-100 p-4 rounded-lg mb-4">
                <h3 class="font-bold text-green-800 mb-2">基础Token</h3>
                <div class="text-sm text-green-600 space-y-1">
                  <div>primary-500: #191919</div>
                  <div>white: #ffffff</div>
                  <div>font-size-sm: 14px</div>
                </div>
              </div>
            </div>

            <!-- 语义Token -->
            <div class="text-center">
              <div class="bg-blue-100 p-4 rounded-lg mb-4">
                <h3 class="font-bold text-blue-800 mb-2">语义Token</h3>
                <div class="text-sm text-blue-600 space-y-1">
                  <div>button-primary-bg → primary-500</div>
                  <div>button-primary-text → white</div>
                  <div>text-body → font-size-sm</div>
                </div>
              </div>
            </div>

            <!-- 组件Token -->
            <div class="text-center">
              <div class="bg-purple-100 p-4 rounded-lg mb-4">
                <h3 class="font-bold text-purple-800 mb-2">组件Token</h3>
                <div class="text-sm text-purple-600 space-y-1">
                  <div>button-primary → button-primary-bg</div>
                  <div>button-text → button-primary-text</div>
                  <div>input-default → input-bg</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 箭头指示 -->
          <div class="flex justify-center items-center mt-6 space-x-4">
            <div class="text-gray-400">基础Token</div>
            <div class="text-gray-400">→</div>
            <div class="text-gray-400">语义Token</div>
            <div class="text-gray-400">→</div>
            <div class="text-gray-400">组件Token</div>
          </div>
        </div>
      </section>

      <!-- 设计原则 -->
      <section>
        <h2 class="text-xl font-bold mb-6">设计原则</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-yellow-50 p-4 rounded-lg">
            <h3 class="font-bold text-yellow-800 mb-2">✅ 正确的做法</h3>
            <ul class="text-sm text-yellow-700 space-y-1">
              <li>• 语义Token引用基础Token</li>
              <li>• 组件Token引用语义Token</li>
              <li>• 保持Token的语义化命名</li>
              <li>• 避免直接使用具体数值</li>
            </ul>
          </div>
          <div class="bg-red-50 p-4 rounded-lg">
            <h3 class="font-bold text-red-800 mb-2">❌ 错误的做法</h3>
            <ul class="text-sm text-red-700 space-y-1">
              <li>• 语义Token直接定义具体值</li>
              <li>• 组件Token直接引用基础Token</li>
              <li>• 使用非语义化的命名</li>
              <li>• 在组件中硬编码样式值</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Token命名规范 -->
      <section>
        <h2 class="text-xl font-bold mb-6">Token命名规范</h2>
        
        <div class="space-y-6">
          <!-- 基础Token命名 -->
          <div>
            <h3 class="text-lg font-medium mb-3">基础Token (Base Tokens)</h3>
            <div class="bg-green-50 p-4 rounded-lg">
              <p class="text-sm text-gray-700 mb-3">格式：<code class="bg-gray-200 px-2 py-1 rounded">类型-特征-规格</code></p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-medium text-green-800">颜色 (colors)</h4>
                  <ul class="text-sm text-gray-600 mt-1 space-y-1">
                    <li><code>gray-50</code> - 灰色系-明度50</li>
                    <li><code>blue-500</code> - 蓝色系-主色调</li>
                    <li><code>red-600</code> - 红色系-深色调</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-green-800">间距 (spacing)</h4>
                  <ul class="text-sm text-gray-600 mt-1 space-y-1">
                    <li><code>space-xs</code> - 超小间距</li>
                    <li><code>space-sm</code> - 小间距</li>
                    <li><code>space-md</code> - 中间距</li>
                    <li><code>space-lg</code> - 大间距</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 语义Token命名 -->
          <div>
            <h3 class="text-lg font-medium mb-3">语义Token (Semantic Tokens)</h3>
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-sm text-gray-700 mb-3">格式：<code class="bg-gray-200 px-2 py-1 rounded">类别.用途-状态</code></p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-medium text-blue-800">表面色彩 (surface)</h4>
                  <ul class="text-sm text-gray-600 mt-1 space-y-1">
                    <li><code>surface.primary-surface</code> - 主要表面</li>
                    <li><code>surface.primary-surface-hover</code> - 主要表面悬停</li>
                    <li><code>surface.disabled-surface</code> - 禁用表面</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-blue-800">文本颜色 (text)</h4>
                  <ul class="text-sm text-gray-600 mt-1 space-y-1">
                    <li><code>text.primary-text</code> - 主要文本</li>
                    <li><code>text.secondary-text</code> - 次要文本</li>
                    <li><code>text.muted-text</code> - 弱化文本</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 组件Token命名 -->
          <div>
            <h3 class="text-lg font-medium mb-3">组件Token (Component Tokens)</h3>
            <div class="bg-red-50 p-4 rounded-lg">
              <p class="text-sm text-gray-700 mb-3">格式：<code class="bg-gray-200 px-2 py-1 rounded">组件-变体-状态</code></p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-medium text-red-800">按钮组件 (button)</h4>
                  <ul class="text-sm text-gray-600 mt-1 space-y-1">
                    <li><code>button-primary-default</code> - 主按钮默认状态</li>
                    <li><code>button-primary-hover</code> - 主按钮悬停状态</li>
                    <li><code>button-secondary-default</code> - 次要按钮默认状态</li>
                    <li><code>button-primary-small-default</code> - 小尺寸主按钮</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-red-800">输入框组件 (input)</h4>
                  <ul class="text-sm text-gray-600 mt-1 space-y-1">
                    <li><code>input-standard-default</code> - 标准输入框默认</li>
                    <li><code>input-standard-focus</code> - 标准输入框聚焦</li>
                    <li><code>input-standard-error</code> - 标准输入框错误</li>
                    <li><code>input-small-default</code> - 小尺寸输入框</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 变体定义规范 -->
      <section>
        <h2 class="text-xl font-bold mb-6">变体定义规范</h2>
        <div class="bg-yellow-50 p-4 rounded-lg">
          <div class="space-y-4">
            <div>
              <h3 class="font-medium text-yellow-800 mb-2">变体概念</h3>
              <p class="text-sm text-gray-700">变体是组件在特定状态下的<strong>完整样式组合</strong>，不是单个样式属性。</p>
            </div>
            <div>
              <h3 class="font-medium text-yellow-800 mb-2">按钮变体示例</h3>
              <ul class="text-sm text-gray-600 space-y-1">
                <li><strong>主按钮 (primary)</strong> - 包含背景色+文字色+圆角+内边距+字体等完整样式</li>
                <li><strong>次要按钮 (secondary)</strong> - 包含背景色+文字色+边框色+圆角+内边距+字体等完整样式</li>
                <li><strong>小尺寸主按钮 (primary-small)</strong> - 主按钮的小尺寸版本，包含所有相关样式</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { tokenStats } from '../stores/tokenStore'
import TokenStats from './TokenStats.vue'
</script> 