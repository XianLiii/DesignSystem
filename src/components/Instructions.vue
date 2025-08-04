<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-8">使用说明</h1>
    
    <div class="space-y-8">
      <!-- 项目简介 -->
      <section>
        <h2 class="text-xl font-bold mb-4">项目简介</h2>
        <p class="text-gray-700 leading-relaxed">
          本产品是一个可编辑的 Design Token 定义、修改、编辑、实时预览当前样式组件效果、导入、导出的工具。
          导出的 Design Token 文件不仅可以用于 CSS，还可以跨平台提供给 Python QT QSS 使用。
        </p>
      </section>

      <!-- Token 三层定义 -->
      <section>
        <h2 class="text-xl font-bold mb-4">Token 三层定义及关联关系</h2>
        <div class="space-y-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2 text-blue-900">基础Token (Base Token)</h3>
            <p class="text-sm text-gray-700">
              与上下文无关的属性值，定义了最基本的设计元素，如颜色值、间距值等。
            </p>
            <p class="text-sm text-gray-600 mt-2">
              <strong>示例：</strong> #F3F4F6（灰色）、16px（间距）
            </p>
          </div>

          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2 text-green-900">语义Token (Semantic Token)</h3>
            <p class="text-sm text-gray-700">
              定义使用场景和目的，只能通过引用基础Token实现。
              <span class="text-red-600 font-semibold">注意：语义Token不得直接定义具体属性值。</span>
            </p>
            <p class="text-sm text-gray-600 mt-2">
              <strong>示例：</strong> surface.primary-surface → gray-50
            </p>
          </div>

          <div class="bg-purple-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2 text-purple-900">组件Token (Component Token)</h3>
            <p class="text-sm text-gray-700">
              直接应用于组件样式定义的Token，通过引用语义Token实现。
              <span class="text-red-600 font-semibold">注意：组件Token不得直接引用基础Token。</span>
            </p>
            <p class="text-sm text-gray-600 mt-2">
              <strong>示例：</strong> button-primary-default → surface.primary-surface
            </p>
          </div>
        </div>
      </section>

      <!-- 功能说明 -->
      <section>
        <h2 class="text-xl font-bold mb-4">功能说明</h2>
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold mb-2">1. 全量Token列表</h3>
            <ul class="list-disc list-inside ml-4 text-sm text-gray-700 space-y-1">
              <li>查看所有Token的完整配置</li>
              <li>编辑基础Token值（点击基础值列进行编辑）</li>
              <li>使用筛选器快速查找特定Token</li>
              <li>导出当前配置为CSV文件</li>
              <li>导入CSV文件更新Token配置</li>
              <li>查看修改记录并支持回退操作</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2">2. 组件页面</h3>
            <ul class="list-disc list-inside ml-4 text-sm text-gray-700 space-y-1">
              <li>查看组件的真实可交互示例</li>
              <li>查看各交互状态的静态样式展示</li>
              <li>查看组件使用的Token配置表格</li>
              <li>实时预览Token修改效果</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2">3. 主题管理</h3>
            <ul class="list-disc list-inside ml-4 text-sm text-gray-700 space-y-1">
              <li>导入CSV文件并保存为主题</li>
              <li>切换不同主题查看组件效果</li>
              <li>管理主题（增加、删除、修改）</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 使用提示 -->
      <section>
        <h2 class="text-xl font-bold mb-4">使用提示</h2>
        <div class="bg-yellow-50 p-4 rounded-lg">
          <ul class="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li>编辑基础Token值时，会实时更新到所有引用该Token的组件</li>
            <li>筛选器之间存在关联，选择组件后其他筛选项会自动更新</li>
            <li>所有Token必须遵循三层关联关系，不能跨层引用</li>
            <li>导入CSV文件时，系统会自动校验格式并更新所有组件</li>
            <li>修改操作都会被记录，可以随时查看并回退</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// 无需额外的逻辑
</script>