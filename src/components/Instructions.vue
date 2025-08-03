<template>
  <div class="p-8 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">使用说明</h1>
    
    <div class="space-y-8">
      <!-- 快速开始 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">快速开始</h2>
        <div class="bg-blue-50 p-4 rounded-lg">
          <ol class="list-decimal list-inside space-y-2 text-gray-700">
            <li>查看"概述"页面了解Token架构</li>
            <li>浏览"全量Token"查看所有设计令牌</li>
            <li>访问具体组件页面查看组件相关Token</li>
            <li>使用筛选器快速定位目标Token</li>
            <li>通过CSV功能导入/导出Token数据</li>
          </ol>
        </div>
      </section>



      <!-- 使用流程 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">使用流程</h2>
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h3 class="font-medium">选择基础Token</h3>
                <p class="text-sm text-gray-600">从颜色、间距、字体等基础Token中选择合适的值</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h3 class="font-medium">定义语义Token</h3>
                <p class="text-sm text-gray-600">根据使用场景将基础Token映射为语义Token</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h3 class="font-medium">创建组件Token</h3>
                <p class="text-sm text-gray-600">将语义Token组合为组件的完整样式变体</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <h3 class="font-medium">应用到设计</h3>
                <p class="text-sm text-gray-600">在设计工具和代码中引用组件Token</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 筛选器使用 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">筛选器使用指南</h2>
        <div class="bg-purple-50 p-4 rounded-lg">
          <div class="space-y-3">
            <p class="text-sm text-gray-700">筛选器之间具有关联性，选择一个筛选条件会影响其他筛选器的可选项：</p>
            <ul class="text-sm text-gray-600 space-y-2">
              <li><strong>组件筛选</strong> - 选择特定组件后，其他筛选器只显示该组件相关的选项</li>
              <li><strong>变体筛选</strong> - 进一步细化到特定变体</li>
              <li><strong>状态筛选</strong> - 筛选交互状态（默认、悬停、激活等）</li>
              <li><strong>类型筛选</strong> - 按Token类型筛选（颜色、间距、字体等）</li>
              <li><strong>名称筛选</strong> - 按Token名称的关键词筛选</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 导入导出 -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">CSV导入导出</h2>
        <div class="bg-green-50 p-4 rounded-lg">
          <div class="space-y-3">
            <div>
              <h3 class="font-medium text-green-800 mb-2">导出功能</h3>
              <p class="text-sm text-gray-600">点击"导出CSV"按钮可将当前所有Token数据导出为CSV文件，方便在其他工具中编辑。</p>
            </div>
            <div>
              <h3 class="font-medium text-green-800 mb-2">导入功能</h3>
              <p class="text-sm text-gray-600">点击"导入CSV文件"可以导入新的Token配置，系统会自动解析并更新所有Token数据。</p>
            </div>
            <div>
              <h3 class="font-medium text-green-800 mb-2">注意事项</h3>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• 导入时会替换现有的所有Token数据</li>
                <li>• 请确保CSV文件格式正确</li>
                <li>• 建议导入前先导出当前数据作为备份</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// 静态内容页面，无需额外逻辑
</script>