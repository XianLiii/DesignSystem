import { reactive, ref, computed } from 'vue'

// 历史记录相关
export const historyRecords = ref([])
export const currentHistoryIndex = ref(-1)

// 基础Token数据 - 保持不变，确保原子性
export const baseTokens = reactive({
  colors: {
    'primary-500': { value: '#191919', type: 'color', usage: '基础主要色调值' },
    'primary-600': { value: '#000000', type: 'color', usage: '基础主要色调深色值' },
    'primary-700': { value: '#0a0a0a', type: 'color', usage: '基础主要色调最深值' },
    'secondary-500': { value: '#999999', type: 'color', usage: '次要色调' },
    'secondary-600': { value: '#777777', type: 'color', usage: '次要色调深色' },
    'secondary-700': { value: '#555555', type: 'color', usage: '次要色调最深' },
    'white': { value: '#ffffff', type: 'color', usage: '基础白色值' },
    'gray-50': { value: '#f9f9f9', type: 'color', usage: '基础最浅灰色值' },
    'gray-100': { value: '#f5f5f5', type: 'color', usage: '基础浅灰色值' },
    'gray-200': { value: '#e5e5e5', type: 'color', usage: '基础灰色值' },
    'gray-300': { value: '#d9d9d9', type: 'color', usage: '基础深灰色值' },
    'gray-400': { value: '#a3a3a3', type: 'color', usage: '基础较深灰色值' },
    'gray-500': { value: '#737373', type: 'color', usage: '基础中等灰色值' },
    'gray-900': { value: '#111827', type: 'color', usage: '基础深色文字值' },
    'blue-500': { value: '#3b82f6', type: 'color', usage: '蓝色' },
    'red-50': { value: '#fef2f2', type: 'color', usage: '浅红色' },
    'red-300': { value: '#fca5a5', type: 'color', usage: '红色' },
    'red-600': { value: '#dc2626', type: 'color', usage: '深红色' },
    'green-50': { value: '#f0fdf4', type: 'color', usage: '浅绿色' },
    'green-300': { value: '#86efac', type: 'color', usage: '绿色' },
    'green-600': { value: '#16a34a', type: 'color', usage: '深绿色' }
  },
  spacing: {
    'spacing-1': { value: '4px', type: 'spacing', usage: '基础最小间距值' },
    'spacing-2': { value: '8px', type: 'spacing', usage: '基础小间距值' },
    'spacing-3': { value: '12px', type: 'spacing', usage: '基础中等间距值' },
    'spacing-4': { value: '16px', type: 'spacing', usage: '基础标准间距值' },
    'spacing-5': { value: '20px', type: 'spacing', usage: '基础大间距值' },
    'spacing-6': { value: '24px', type: 'spacing', usage: '基础超大间距值' }
  },
  typography: {
    'font-size-sm': { value: '14px', type: 'typography', usage: '基础小字体尺寸值' },
    'font-size-base': { value: '16px', type: 'typography', usage: '基础标准字体尺寸值' },
    'font-size-lg': { value: '24px', type: 'typography', usage: '基础大字体尺寸值' },
    'font-size-xl': { value: '40px', type: 'typography', usage: '基础超大字体尺寸值' },
    'font-weight-normal': { value: '400', type: 'typography', usage: '基础常规字重值' },
    'font-weight-bold': { value: '700', type: 'typography', usage: '基础粗体字重值' }
  },
  border: {
    'border-radius-sm': { value: '1px', type: 'border', usage: '基础小圆角值' },
    'border-radius-md': { value: '4px', type: 'border', usage: '基础中等圆角值' },
    'border-radius-lg': { value: '8px', type: 'border', usage: '基础大圆角值' },
    'border-width-thin': { value: '1px', type: 'border', usage: '基础细边框宽度值' },
    'border-width-medium': { value: '2px', type: 'border', usage: '基础中等边框宽度值' },
    'border-width-thick': { value: '4px', type: 'border', usage: '基础粗边框宽度值' }
  },
  shadow: {
    'shadow-sm': { value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', type: 'shadow', usage: '基础小阴影值' },
    'shadow-md': { value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', type: 'shadow', usage: '基础中等阴影值' },
    'shadow-lg': { value: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', type: 'shadow', usage: '基础大阴影值' },
    'shadow-xl': { value: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', type: 'shadow', usage: '基础超大阴影值' }
  },
  animation: {
    'duration-fast': { value: '150ms', type: 'animation', usage: '基础快速动画时长值' },
    'duration-normal': { value: '300ms', type: 'animation', usage: '基础标准动画时长值' },
    'duration-slow': { value: '500ms', type: 'animation', usage: '基础慢速动画时长值' },
    'easing-linear': { value: 'linear', type: 'animation', usage: '基础线性缓动函数值' },
    'easing-ease-in': { value: 'ease-in', type: 'animation', usage: '基础渐入缓动函数值' },
    'easing-ease-out': { value: 'ease-out', type: 'animation', usage: '基础渐出缓动函数值' },
    'easing-ease-in-out': { value: 'ease-in-out', type: 'animation', usage: '基础渐入渐出缓动函数值' }
  },
  sizing: {
    'size-xs': { value: '24px', type: 'sizing', usage: '基础超小尺寸值' },
    'size-sm': { value: '32px', type: 'sizing', usage: '基础小尺寸值' },
    'size-md': { value: '40px', type: 'sizing', usage: '基础中等尺寸值' },
    'size-lg': { value: '48px', type: 'sizing', usage: '基础大尺寸值' },
    'size-xl': { value: '56px', type: 'sizing', usage: '基础超大尺寸值' }
  },
  opacity: {
    'opacity-0': { value: '0', type: 'opacity', usage: '基础完全透明值' },
    'opacity-25': { value: '0.25', type: 'opacity', usage: '基础25%透明度值' },
    'opacity-50': { value: '0.5', type: 'opacity', usage: '基础50%透明度值' },
    'opacity-75': { value: '0.75', type: 'opacity', usage: '基础75%透明度值' },
    'opacity-100': { value: '1', type: 'opacity', usage: '基础完全不透明值' }
  }
})

// 语义Token数据 - 重构为场景化概念
export const semanticTokens = reactive({
  // 表面色彩语义（Surface Colors）
  surface: {
    'primary-surface': { 
      value: 'primary-500', 
      type: 'background', 
      usage: '主要交互表面的背景色',
      baseToken: 'colors.primary-500'
    },
    'primary-surface-hover': { 
      value: 'primary-600', 
      type: 'background', 
      usage: '主要交互表面悬停时的背景色',
      baseToken: 'colors.primary-600'
    },
    'primary-surface-active': { 
      value: 'primary-700', 
      type: 'background', 
      usage: '主要交互表面激活时的背景色',
      baseToken: 'colors.primary-700'
    },
    'secondary-surface': { 
      value: 'white', 
      type: 'background', 
      usage: '次要交互表面的背景色',
      baseToken: 'colors.white'
    },
    'secondary-surface-hover': { 
      value: 'gray-50', 
      type: 'background', 
      usage: '次要交互表面悬停时的背景色',
      baseToken: 'colors.gray-50'
    },
    'secondary-surface-active': { 
      value: 'gray-100', 
      type: 'background', 
      usage: '次要交互表面激活时的背景色',
      baseToken: 'colors.gray-100'
    },
    'disabled-surface': { 
      value: 'gray-100', 
      type: 'background', 
      usage: '禁用状态表面的背景色',
      baseToken: 'colors.gray-100'
    },
    'accent-surface': {
      value: 'blue-50',
      type: 'background',
      usage: '强调色背景表面',
      baseToken: 'colors.blue-50'
    },
    'edited-surface': {
      value: 'yellow-50',
      type: 'background',
      usage: '已编辑内容的背景色',
      baseToken: 'colors.yellow-50'
    },
    'error-surface': { 
      value: 'red-50', 
      type: 'background', 
      usage: '错误状态表面的背景色',
      baseToken: 'colors.red-50'
    },
    'success-surface': { 
      value: 'green-50', 
      type: 'background', 
      usage: '成功状态表面的背景色',
      baseToken: 'colors.green-50'
    },
    'input-surface': { 
      value: 'white', 
      type: 'background', 
      usage: '输入控件的表面背景色',
      baseToken: 'colors.white'
    }
  },
  
  // 文字色彩语义（Text Colors）
  text: {
    'primary-text': { 
      value: 'white', 
      type: 'text', 
      usage: '在主要表面上的文字颜色',
      baseToken: 'colors.white'
    },
    'secondary-text': { 
      value: 'secondary-500', 
      type: 'text', 
      usage: '次要重要性的文字颜色',
      baseToken: 'colors.secondary-500'
    },
    'secondary-text-on-surface': { 
      value: 'white', 
      type: 'text', 
      usage: '在次要表面上的文字颜色',
      baseToken: 'colors.white'
    },
    'body-text': { 
      value: 'gray-900', 
      type: 'text', 
      usage: '正文内容的文字颜色',
      baseToken: 'colors.gray-900'
    },
    'disabled-text': { 
      value: 'gray-400', 
      type: 'text', 
      usage: '禁用状态的文字颜色',
      baseToken: 'colors.gray-400'
    },
    'error-text': { 
      value: 'red-600', 
      type: 'text', 
      usage: '错误信息的文字颜色',
      baseToken: 'colors.red-600'
    },
    'success-text': { 
      value: 'green-600', 
      type: 'text', 
      usage: '成功信息的文字颜色',
      baseToken: 'colors.green-600'
    },
    'muted-text': { 
      value: 'gray-500', 
      type: 'text', 
      usage: '减弱的辅助文字颜色',
      baseToken: 'colors.gray-500'
    }
  },
  
  // 边框语义（Border Colors）  
  border: {
    'interactive-border': { 
      value: 'gray-300', 
      type: 'border', 
      usage: '可交互元素的默认边框色',
      baseToken: 'colors.gray-300'
    },
    'interactive-border-focus': { 
      value: 'blue-500', 
      type: 'border', 
      usage: '可交互元素聚焦时的边框色',
      baseToken: 'colors.blue-500'
    },
    'interactive-border-hover': { 
      value: 'secondary-500', 
      type: 'border', 
      usage: '可交互元素悬停时的边框色',
      baseToken: 'colors.secondary-500'
    },
    'disabled-border': { 
      value: 'gray-200', 
      type: 'border', 
      usage: '禁用状态的边框色',
      baseToken: 'colors.gray-200'
    },
    'error-border': { 
      value: 'red-300', 
      type: 'border', 
      usage: '错误状态的边框色',
      baseToken: 'colors.red-300'
    },
    'primary-border': { 
      value: 'secondary-500', 
      type: 'border', 
      usage: '主要重要性的边框色',
      baseToken: 'colors.secondary-500'
    },
    'subtle-border': { 
      value: 'gray-200', 
      type: 'border', 
      usage: '细微的分隔边框色',
      baseToken: 'colors.gray-200'
    },
    'success-border': { 
      value: 'green-300', 
      type: 'border', 
      usage: '成功状态的边框色',
      baseToken: 'colors.green-300'
    },
    'default-width': {
      value: 'border-width-thin',
      type: 'border',
      usage: '默认边框宽度',
      baseToken: 'border.border-width-thin'
    },
    'default-border': {
      value: 'gray-300',
      type: 'border',
      usage: '默认边框颜色',
      baseToken: 'colors.gray-300'
    },
    'focus-border': {
      value: 'blue-400',
      type: 'border',
      usage: '聚焦状态边框颜色',
      baseToken: 'colors.blue-400'
    }
  },

  // 间距语义（Spacing）
  spacing: {
    'compact-spacing': { 
      value: 'spacing-1', 
      type: 'spacing', 
      usage: '紧凑布局的间距',
      baseToken: 'spacing.spacing-1'
    },
    'cozy-spacing': { 
      value: 'spacing-2', 
      type: 'spacing', 
      usage: '舒适布局的间距',
      baseToken: 'spacing.spacing-2'
    },
    'comfortable-spacing': { 
      value: 'spacing-3', 
      type: 'spacing', 
      usage: '宽松布局的间距',
      baseToken: 'spacing.spacing-3'
    },
    'normal-padding': {
      value: 'spacing-2',
      type: 'spacing',
      usage: '标准内边距',
      baseToken: 'spacing.spacing-2'
    },
    'compact-padding': {
      value: 'spacing-1',
      type: 'spacing',
      usage: '紧凑内边距',
      baseToken: 'spacing.spacing-1'
    },
    'spacious-spacing': { 
      value: 'spacing-4', 
      type: 'spacing', 
      usage: '宽敞布局的间距',
      baseToken: 'spacing.spacing-4'
    },
    'generous-spacing': { 
      value: 'spacing-5', 
      type: 'spacing', 
      usage: '慷慨布局的间距',
      baseToken: 'spacing.spacing-5'
    },
    'luxurious-spacing': { 
      value: 'spacing-6', 
      type: 'spacing', 
      usage: '奢华布局的间距',
      baseToken: 'spacing.spacing-6'
    }
  },

  // 字体语义（Typography）
  typography: {
    'body-text-size': { 
      value: 'font-size-base', 
      type: 'typography', 
      usage: '正文的字体大小',
      baseToken: 'typography.font-size-base'
    },
    'heading-text-size': { 
      value: 'font-size-lg', 
      type: 'typography', 
      usage: '标题的字体大小',
      baseToken: 'typography.font-size-lg'
    },
    'small-text-size': { 
      value: 'font-size-sm', 
      type: 'typography', 
      usage: '辅助信息的字体大小',
      baseToken: 'typography.font-size-sm'
    },
    'large-text-size': { 
      value: 'font-size-xl', 
      type: 'typography', 
      usage: '突出内容的字体大小',
      baseToken: 'typography.font-size-xl'
    },
    'emphasis-text-weight': { 
      value: 'font-weight-bold', 
      type: 'typography', 
      usage: '强调文字的字重',
      baseToken: 'typography.font-weight-bold'
    },
    'body-size': {
      value: 'font-size-base',
      type: 'typography',
      usage: '正文字体大小',
      baseToken: 'typography.font-size-base'
    },
    'small-size': {
      value: 'font-size-sm',
      type: 'typography',
      usage: '小号字体大小',
      baseToken: 'typography.font-size-sm'
    },
    'emphasis-weight': {
      value: 'font-weight-bold',
      type: 'typography',
      usage: '强调字体粗细',
      baseToken: 'typography.font-weight-bold'
    },
    'normal-text-weight': { 
      value: 'font-weight-normal', 
      type: 'typography', 
      usage: '常规文字的字重',
      baseToken: 'typography.font-weight-normal'
    }
  },

  // 圆角语义（Border Radius）
  radius: {
    'small-radius': {
      value: 'border-radius-sm',
      type: 'border',
      usage: '小圆角效果',
      baseToken: 'border.border-radius-sm'
    },
    'subtle-radius': { 
      value: 'border-radius-sm', 
      type: 'border', 
      usage: '细微的圆角效果',
      baseToken: 'border.border-radius-sm'
    },
    'moderate-radius': { 
      value: 'border-radius-md', 
      type: 'border', 
      usage: '适中的圆角效果',
      baseToken: 'border.border-radius-md'
    },
    'prominent-radius': { 
      value: 'border-radius-lg', 
      type: 'border', 
      usage: '明显的圆角效果',
      baseToken: 'border.border-radius-lg'
    }
  },

  // 阴影语义（Shadow）
  shadow: {
    'subtle-shadow': { 
      value: 'shadow-sm', 
      type: 'shadow', 
      usage: '细微的阴影效果',
      baseToken: 'shadow.shadow-sm'
    },
    'moderate-shadow': { 
      value: 'shadow-md', 
      type: 'shadow', 
      usage: '适中的阴影效果',
      baseToken: 'shadow.shadow-md'
    },
    'prominent-shadow': { 
      value: 'shadow-lg', 
      type: 'shadow', 
      usage: '显著的阴影效果',
      baseToken: 'shadow.shadow-lg'
    },
    'elevated-shadow': { 
      value: 'shadow-xl', 
      type: 'shadow', 
      usage: '高层级的阴影效果',
      baseToken: 'shadow.shadow-xl'
    }
  },

  // 动画语义（Animation）
  animation: {
    'quick-transition': { 
      value: 'duration-fast', 
      type: 'animation', 
      usage: '快速的过渡动画',
      baseToken: 'animation.duration-fast'
    },
    'standard-transition': { 
      value: 'duration-normal', 
      type: 'animation', 
      usage: '标准的过渡动画',
      baseToken: 'animation.duration-normal'
    },
    'smooth-transition': { 
      value: 'duration-slow', 
      type: 'animation', 
      usage: '平滑的过渡动画',
      baseToken: 'animation.duration-slow'
    },
    'standard-easing': { 
      value: 'easing-ease-in-out', 
      type: 'animation', 
      usage: '标准的缓动函数',
      baseToken: 'animation.easing-ease-in-out'
    }
  },

  // 尺寸语义（Sizing）
  sizing: {
    'compact-size': { 
      value: 'size-xs', 
      type: 'sizing', 
      usage: '紧凑的元素尺寸',
      baseToken: 'sizing.size-xs'
    },
    'small-size': { 
      value: 'size-sm', 
      type: 'sizing', 
      usage: '小型的元素尺寸',
      baseToken: 'sizing.size-sm'
    },
    'medium-size': { 
      value: 'size-md', 
      type: 'sizing', 
      usage: '中等的元素尺寸',
      baseToken: 'sizing.size-md'
    },
    'large-size': { 
      value: 'size-lg', 
      type: 'sizing', 
      usage: '大型的元素尺寸',
      baseToken: 'sizing.size-lg'
    },
    'extra-large-size': { 
      value: 'size-xl', 
      type: 'sizing', 
      usage: '超大的元素尺寸',
      baseToken: 'sizing.size-xl'
    }
  },

  // 透明度语义（Opacity）
  opacity: {
    'transparent': { 
      value: 'opacity-0', 
      type: 'opacity', 
      usage: '完全透明效果',
      baseToken: 'opacity.opacity-0'
    },
    'subtle-opacity': { 
      value: 'opacity-25', 
      type: 'opacity', 
      usage: '细微的透明效果',
      baseToken: 'opacity.opacity-25'
    },
    'moderate-opacity': { 
      value: 'opacity-50', 
      type: 'opacity', 
      usage: '适中的透明效果',
      baseToken: 'opacity.opacity-50'
    },
    'prominent-opacity': { 
      value: 'opacity-75', 
      type: 'opacity', 
      usage: '显著的透明效果',
      baseToken: 'opacity.opacity-75'
    },
    'opaque': { 
      value: 'opacity-100', 
      type: 'opacity', 
      usage: '完全不透明效果',
      baseToken: 'opacity.opacity-100'
    }
  }
})

// 组件Token数据 - 按变体组织，每个变体包含完整的样式组合
export const componentTokens = reactive({
  button: {
    // 主按钮变体 - 完整样式组合
    'button-primary-default': {
      type: 'component',
      variant: 'primary',
      state: 'default',
      usage: '主按钮默认状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.primary-surface' },
        text: { semanticToken: 'text.primary-text' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' },
        transition: { semanticToken: 'animation.quick-transition' }
      }
    },
    'button-primary-hover': {
      type: 'component',
      variant: 'primary',
      state: 'hover',
      usage: '主按钮悬停状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.primary-surface-hover' },
        text: { semanticToken: 'text.primary-text' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' },
        transition: { semanticToken: 'animation.quick-transition' }
      }
    },
    'button-primary-active': {
      type: 'component',
      variant: 'primary',
      state: 'active',
      usage: '主按钮激活状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.primary-surface-active' },
        text: { semanticToken: 'text.primary-text' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' },
        transition: { semanticToken: 'animation.quick-transition' }
      }
    },
    'button-primary-disabled': {
      type: 'component',
      variant: 'primary',
      state: 'disabled',
      usage: '主按钮禁用状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.disabled-surface' },
        text: { semanticToken: 'text.disabled-text' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' },
        transition: { semanticToken: 'animation.quick-transition' }
      }
    },
    'button-primary-focus': {
      type: 'component',
      variant: 'primary',
      state: 'focus',
      usage: '主按钮聚焦状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.primary-surface' },
        text: { semanticToken: 'text.primary-text' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' },
        boxShadow: { semanticToken: 'shadow.moderate-shadow' },
        transition: { semanticToken: 'animation.quick-transition' },
        outline: { value: '2px solid #3b82f6' },
        outlineOffset: { value: '2px' }
      }
    },

    // 次要按钮变体 - 完整样式组合
    'button-secondary-default': {
      type: 'component',
      variant: 'secondary',
      state: 'default',
      usage: '次要按钮默认状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.secondary-surface' },
        text: { semanticToken: 'text.secondary-text' },
        border: { semanticToken: 'border.primary-border' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' },
        transition: { semanticToken: 'animation.quick-transition' }
      }
    },
    'button-secondary-hover': {
      type: 'component',
      variant: 'secondary',
      state: 'hover',
      usage: '次要按钮悬停状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.secondary-surface-hover' },
        text: { semanticToken: 'text.secondary-text-on-surface' },
        border: { semanticToken: 'border.interactive-border-hover' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' },
        transition: { semanticToken: 'animation.quick-transition' }
      }
    },
    'button-secondary-active': {
      type: 'component',
      variant: 'secondary',
      state: 'active',
      usage: '次要按钮激活状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.secondary-surface-active' },
        text: { semanticToken: 'text.secondary-text-on-surface' },
        border: { semanticToken: 'border.interactive-border-hover' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' },
        transition: { semanticToken: 'animation.quick-transition' }
      }
    },
    'button-secondary-disabled': {
      type: 'component',
      variant: 'secondary',
      state: 'disabled',
      usage: '次要按钮禁用状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.disabled-surface' },
        text: { semanticToken: 'text.disabled-text' },
        border: { semanticToken: 'border.disabled-border' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' },
        transition: { semanticToken: 'animation.quick-transition' }
      }
    },
    'button-secondary-focus': {
      type: 'component',
      variant: 'secondary',
      state: 'focus',
      usage: '次要按钮聚焦状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.secondary-surface' },
        text: { semanticToken: 'text.secondary-text' },
        border: { semanticToken: 'border.primary-border' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' },
        boxShadow: { semanticToken: 'shadow.moderate-shadow' },
        transition: { semanticToken: 'animation.quick-transition' },
        outline: { value: '2px solid #3b82f6' },
        outlineOffset: { value: '2px' }
      }
    },

    // 小按钮变体 - 主按钮的小尺寸版本
    'button-primary-small-default': {
      type: 'component',
      variant: 'primary',
      size: 'small',
      state: 'default',
      usage: '小尺寸主按钮默认状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.primary-surface' },
        text: { semanticToken: 'text.primary-text' },
        borderRadius: { semanticToken: 'radius.subtle-radius' },
        padding: { semanticToken: 'spacing.compact-spacing' },
        fontSize: { semanticToken: 'typography.small-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' }
      }
    },

    // 大按钮变体 - 主按钮的大尺寸版本
    'button-primary-large-default': {
      type: 'component',
      variant: 'primary',
      size: 'large',
      state: 'default',
      usage: '大尺寸主按钮默认状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.primary-surface' },
        text: { semanticToken: 'text.primary-text' },
        borderRadius: { semanticToken: 'radius.prominent-radius' },
        padding: { semanticToken: 'spacing.comfortable-spacing' },
        fontSize: { semanticToken: 'typography.heading-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' }
      }
    },

    // Ghost按钮变体 - 透明背景的按钮
    'button-ghost-default': {
      type: 'component',
      variant: 'ghost',
      state: 'default',
      usage: '幽灵按钮默认状态的完整样式组合',
      styles: {
        background: { value: 'transparent' },
        text: { semanticToken: 'text.primary-text' },
        border: { value: 'none' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' }
      }
    },
    'button-ghost-hover': {
      type: 'component',
      variant: 'ghost',
      state: 'hover',
      usage: '幽灵按钮悬停状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.secondary-surface' },
        text: { semanticToken: 'text.primary-text' },
        border: { value: 'none' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' }
      }
    },
    'button-ghost-active': {
      type: 'component',
      variant: 'ghost',
      state: 'active',
      usage: '幽灵按钮激活状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.secondary-surface-active' },
        text: { semanticToken: 'text.primary-text' },
        border: { value: 'none' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' }
      }
    },
    'button-ghost-disabled': {
      type: 'component',
      variant: 'ghost',
      state: 'disabled',
      usage: '幽灵按钮禁用状态的完整样式组合',
      styles: {
        background: { value: 'transparent' },
        text: { semanticToken: 'text.disabled-text' },
        border: { value: 'none' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' }
      }
    },
    'button-ghost-focus': {
      type: 'component',
      variant: 'ghost',
      state: 'focus',
      usage: '幽灵按钮聚焦状态的完整样式组合',
      styles: {
        background: { value: 'transparent' },
        text: { semanticToken: 'text.primary-text' },
        border: { value: 'none' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        fontWeight: { semanticToken: 'typography.emphasis-text-weight' },
        outline: { value: '2px solid #3b82f6' },
        outlineOffset: { value: '2px' }
      }
    }
  },

  input: {
    // 标准输入框变体 - 完整样式组合
    'input-standard-default': {
      type: 'component',
      variant: 'standard',
      state: 'default',
      usage: '标准输入框默认状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.input-surface' },
        border: { semanticToken: 'border.interactive-border' },
        text: { semanticToken: 'text.body-text' },
        placeholder: { semanticToken: 'text.muted-text' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        transition: { semanticToken: 'animation.quick-transition' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' }
      }
    },
    'input-standard-hover': {
      type: 'component',
      variant: 'standard',
      state: 'hover',
      usage: '标准输入框悬停状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.input-surface' },
        border: { semanticToken: 'border.interactive-border-hover' },
        text: { semanticToken: 'text.body-text' },
        placeholder: { semanticToken: 'text.muted-text' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        transition: { semanticToken: 'animation.quick-transition' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' }
      }
    },
    'input-standard-focus': {
      type: 'component',
      variant: 'standard',
      state: 'focus',
      usage: '标准输入框聚焦状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.input-surface' },
        border: { semanticToken: 'border.interactive-border-focus' },
        text: { semanticToken: 'text.body-text' },
        placeholder: { semanticToken: 'text.muted-text' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        transition: { semanticToken: 'animation.quick-transition' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' }
      }
    },
    'input-standard-disabled': {
      type: 'component',
      variant: 'standard',
      state: 'disabled',
      usage: '标准输入框禁用状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.disabled-surface' },
        border: { semanticToken: 'border.disabled-border' },
        text: { semanticToken: 'text.disabled-text' },
        placeholder: { semanticToken: 'text.disabled-text' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        transition: { semanticToken: 'animation.quick-transition' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' }
      }
    },
    'input-standard-error': {
      type: 'component',
      variant: 'standard',
      state: 'error',
      usage: '标准输入框错误状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.error-surface' },
        border: { semanticToken: 'border.error-border' },
        text: { semanticToken: 'text.error-text' },
        placeholder: { semanticToken: 'text.muted-text' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        transition: { semanticToken: 'animation.quick-transition' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' }
      }
    },
    'input-standard-success': {
      type: 'component',
      variant: 'standard',
      state: 'success',
      usage: '标准输入框成功状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.success-surface' },
        border: { semanticToken: 'border.success-border' },
        text: { semanticToken: 'text.success-text' },
        placeholder: { semanticToken: 'text.muted-text' },
        borderRadius: { semanticToken: 'radius.moderate-radius' },
        padding: { semanticToken: 'spacing.cozy-spacing' },
        fontSize: { semanticToken: 'typography.body-text-size' },
        transition: { semanticToken: 'animation.quick-transition' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' }
      }
    },

    // 小尺寸输入框变体
    'input-small-default': {
      type: 'component',
      variant: 'small',
      state: 'default',
      usage: '小尺寸输入框默认状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.input-surface' },
        border: { semanticToken: 'border.interactive-border' },
        text: { semanticToken: 'text.body-text' },
        placeholder: { semanticToken: 'text.muted-text' },
        borderRadius: { semanticToken: 'radius.subtle-radius' },
        padding: { semanticToken: 'spacing.compact-spacing' },
        fontSize: { semanticToken: 'typography.small-text-size' },
        transition: { semanticToken: 'animation.quick-transition' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' }
      }
    },

    // 大尺寸输入框变体
    'input-large-default': {
      type: 'component',
      variant: 'large',
      state: 'default',
      usage: '大尺寸输入框默认状态的完整样式组合',
      styles: {
        background: { semanticToken: 'surface.input-surface' },
        border: { semanticToken: 'border.interactive-border' },
        text: { semanticToken: 'text.body-text' },
        placeholder: { semanticToken: 'text.muted-text' },
        borderRadius: { semanticToken: 'radius.prominent-radius' },
        padding: { semanticToken: 'spacing.comfortable-spacing' },
        fontSize: { semanticToken: 'typography.heading-text-size' },
        transition: { semanticToken: 'animation.quick-transition' },
        boxShadow: { semanticToken: 'shadow.subtle-shadow' }
      }
    }
  },

  common: {
    // 通用文字组件Token
    'text-primary-default': {
      type: 'component',
      usage: '主要文字内容的默认样式应用',
      semanticToken: 'text.body-text'
    },
    'text-secondary-default': {
      type: 'component', 
      usage: '次要文字内容的默认样式应用',
      semanticToken: 'text.secondary-text'
    },
    'text-muted-default': {
      type: 'component',
      usage: '弱化文字内容的默认样式应用',
      semanticToken: 'text.muted-text'
    },

    // 通用背景组件Token
    'bg-primary-default': {
      type: 'component',
      usage: '主要背景区域的默认样式应用',
      semanticToken: 'surface.primary-surface'
    },
    'bg-secondary-default': {
      type: 'component',
      usage: '次要背景区域的默认样式应用',
      semanticToken: 'surface.secondary-surface'
    },

    // 通用边框组件Token
    'border-primary-default': {
      type: 'component',
      usage: '主要边框的默认样式应用',
      semanticToken: 'border.primary-border'
    },
    'border-subtle-default': {
      type: 'component',
      usage: '细微边框的默认样式应用',
      semanticToken: 'border.subtle-border'
    },

    // 通用间距组件Token
    'spacing-compact-default': {
      type: 'component',
      usage: '紧凑间距的布局应用',
      semanticToken: 'spacing.compact-spacing'
    },
    'spacing-cozy-default': {
      type: 'component',
      usage: '舒适间距的布局应用',
      semanticToken: 'spacing.cozy-spacing'
    },
    'spacing-comfortable-default': {
      type: 'component',
      usage: '宽松间距的布局应用',
      semanticToken: 'spacing.comfortable-spacing'
    },
    'spacing-spacious-default': {
      type: 'component',
      usage: '宽敞间距的布局应用',
      semanticToken: 'spacing.spacious-spacing'
    },

    // 通用字体组件Token
    'typography-body-default': {
      type: 'component',
      usage: '正文字体的默认样式应用',
      semanticToken: 'typography.body-text-size'
    },
    'typography-heading-default': {
      type: 'component',
      usage: '标题字体的默认样式应用',
      semanticToken: 'typography.heading-text-size'
    },
    'typography-small-default': {
      type: 'component',
      usage: '小字体的默认样式应用',
      semanticToken: 'typography.small-text-size'
    },
    'typography-emphasis-default': {
      type: 'component',
      usage: '强调字重的默认样式应用',
      semanticToken: 'typography.emphasis-text-weight'
    },

    // 通用圆角组件Token
    'radius-subtle-default': {
      type: 'component',
      usage: '细微圆角的默认界面应用',
      semanticToken: 'radius.subtle-radius'
    },
    'radius-moderate-default': {
      type: 'component',
      usage: '适中圆角的默认界面应用',
      semanticToken: 'radius.moderate-radius'
    },
    'radius-prominent-default': {
      type: 'component',
      usage: '明显圆角的默认界面应用',
      semanticToken: 'radius.prominent-radius'
    }
  },
  
  // 表格组件Token
  table: {
    // 标准表格
    'table-standard-default': {
      type: 'component',
      variant: 'standard',
      state: 'default',
      usage: '标准表格默认样式',
      styles: {
        backgroundColor: { semanticToken: 'surface.primary-surface' },
        border: { semanticToken: 'border.subtle-border' },
        borderWidth: { semanticToken: 'border.default-width' },
        borderRadius: { semanticToken: 'radius.small-radius' }
      }
    },
    'table-standard-header-row': {
      type: 'component',
      variant: 'standard',
      state: 'default',
      usage: '标准表格表头行样式',
      styles: {
        backgroundColor: { semanticToken: 'surface.secondary-surface' },
        borderBottom: { semanticToken: 'border.default-border' }
      }
    },
    'table-standard-header-cell': {
      type: 'component',
      variant: 'standard',
      state: 'default',
      usage: '标准表格表头单元格样式',
      styles: {
        padding: { semanticToken: 'spacing.normal-padding' },
        fontWeight: { semanticToken: 'typography.emphasis-weight' },
        color: { semanticToken: 'text.primary-text' },
        fontSize: { semanticToken: 'typography.body-size' }
      }
    },
    'table-standard-body-row': {
      type: 'component',
      variant: 'standard',
      state: 'default',
      usage: '标准表格数据行样式',
      styles: {
        backgroundColor: { semanticToken: 'surface.primary-surface' },
        borderBottom: { semanticToken: 'border.subtle-border' },
        transition: { semanticToken: 'animation.quick-transition' }
      }
    },
    'table-standard-body-row-stripe': {
      type: 'component',
      variant: 'standard',
      state: 'stripe',
      usage: '标准表格条纹行样式',
      styles: {
        backgroundColor: { semanticToken: 'surface.secondary-surface' },
        borderBottom: { semanticToken: 'border.subtle-border' }
      }
    },
    'table-standard-body-row-hover': {
      type: 'component',
      variant: 'standard',
      state: 'hover',
      usage: '标准表格行悬停样式',
      styles: {
        backgroundColor: { semanticToken: 'surface.secondary-surface-hover' },
        borderBottom: { semanticToken: 'border.subtle-border' },
        transition: { semanticToken: 'animation.quick-transition' }
      }
    },
    'table-standard-cell-readonly': {
      type: 'component',
      variant: 'standard',
      state: 'readonly',
      usage: '标准表格只读单元格样式',
      styles: {
        padding: { semanticToken: 'spacing.normal-padding' },
        color: { semanticToken: 'text.primary-text' },
        fontSize: { semanticToken: 'typography.body-size' },
        backgroundColor: { semanticToken: 'surface.primary-surface' }
      }
    },
    'table-standard-cell-editable': {
      type: 'component',
      variant: 'standard',
      state: 'editable',
      usage: '标准表格可编辑单元格样式',
      styles: {
        padding: { semanticToken: 'spacing.normal-padding' },
        color: { semanticToken: 'text.primary-text' },
        fontSize: { semanticToken: 'typography.body-size' },
        backgroundColor: { semanticToken: 'surface.primary-surface' },
        cursor: { value: 'pointer' }
      }
    },
    'table-standard-cell-disabled': {
      type: 'component',
      variant: 'standard',
      state: 'disabled',
      usage: '标准表格禁用单元格样式',
      styles: {
        padding: { semanticToken: 'spacing.normal-padding' },
        color: { semanticToken: 'text.muted-text' },
        fontSize: { semanticToken: 'typography.body-size' },
        backgroundColor: { semanticToken: 'surface.disabled-surface' },
        cursor: { value: 'not-allowed' }
      }
    },
    'table-standard-cell-edited': {
      type: 'component',
      variant: 'standard',
      state: 'edited',
      usage: '标准表格已编辑单元格样式',
      styles: {
        padding: { semanticToken: 'spacing.normal-padding' },
        color: { semanticToken: 'text.primary-text' },
        fontSize: { semanticToken: 'typography.body-size' },
        backgroundColor: { semanticToken: 'surface.accent-surface' },
        borderLeft: { semanticToken: 'border.primary-border' },
        borderLeftWidth: { value: '3px' }
      }
    },
    'table-standard-cell-input': {
      type: 'component',
      variant: 'standard',
      state: 'editing',
      usage: '标准表格编辑输入框样式',
      styles: {
        padding: { semanticToken: 'spacing.compact-padding' },
        fontSize: { semanticToken: 'typography.body-size' },
        border: { semanticToken: 'border.focus-border' },
        borderRadius: { semanticToken: 'radius.small-radius' }
      }
    },
    
    // 紧凑型表格
    'table-compact-default': {
      type: 'component',
      variant: 'compact',
      state: 'default',
      usage: '紧凑型表格默认样式',
      styles: {
        backgroundColor: { semanticToken: 'surface.primary-surface' },
        border: { semanticToken: 'border.subtle-border' },
        borderWidth: { semanticToken: 'border.default-width' },
        borderRadius: { semanticToken: 'radius.small-radius' }
      }
    },
    'table-compact-header-row': {
      type: 'component',
      variant: 'compact',
      state: 'default',
      usage: '紧凑型表格表头行样式',
      styles: {
        backgroundColor: { semanticToken: 'surface.secondary-surface' },
        borderBottom: { semanticToken: 'border.default-border' }
      }
    },
    'table-compact-header-cell': {
      type: 'component',
      variant: 'compact',
      state: 'default',
      usage: '紧凑型表格表头单元格样式',
      styles: {
        padding: { semanticToken: 'spacing.compact-padding' },
        fontWeight: { semanticToken: 'typography.emphasis-weight' },
        color: { semanticToken: 'text.primary-text' },
        fontSize: { semanticToken: 'typography.small-size' }
      }
    },
    'table-compact-body-row': {
      type: 'component',
      variant: 'compact',
      state: 'default',
      usage: '紧凑型表格数据行样式',
      styles: {
        backgroundColor: { semanticToken: 'surface.primary-surface' },
        borderBottom: { semanticToken: 'border.subtle-border' }
      }
    },
    'table-compact-body-row-stripe': {
      type: 'component',
      variant: 'compact',
      state: 'stripe',
      usage: '紧凑型表格条纹行样式',
      styles: {
        backgroundColor: { semanticToken: 'surface.secondary-surface' },
        borderBottom: { semanticToken: 'border.subtle-border' }
      }
    },
    'table-compact-cell-readonly': {
      type: 'component',
      variant: 'compact',
      state: 'readonly',
      usage: '紧凑型表格只读单元格样式',
      styles: {
        padding: { semanticToken: 'spacing.compact-padding' },
        color: { semanticToken: 'text.primary-text' },
        fontSize: { semanticToken: 'typography.small-size' }
      }
    }
  }
})

// Token统计（动态计算）
// 基于Token名称的唯一性进行统计
export const tokenStats = computed(() => {
  const allTokenData = getAllTokens()
  
  // 使用Set来确保唯一性
  const uniqueBaseTokenNames = new Set()
  const uniqueSemanticTokenNames = new Set()
  const uniqueComponentTokenNames = new Set()
  const uniqueComponents = new Set()
  
  allTokenData.forEach(token => {
    // 基础Token名称：只要名称不一样就算一个
    if (token.baseToken) {
      uniqueBaseTokenNames.add(token.baseToken)
    }
    
    // 语义Token名称：只要名称不一样就算一个
    if (token.semanticToken) {
      uniqueSemanticTokenNames.add(token.semanticToken)
    }
    
    // 组件Token名称：完整的组件Token名称（包含样式属性）
    if (token.componentToken) {
      uniqueComponentTokenNames.add(token.componentToken)
    }
    
    // 组件名称
    if (token.componentName) {
      uniqueComponents.add(token.componentName)
    }
  })

  return {
    baseTokenCount: uniqueBaseTokenNames.size,
    semanticTokenCount: uniqueSemanticTokenNames.size,
    componentTokenCount: uniqueComponentTokenNames.size,
    componentCount: uniqueComponents.size
  }
})

// 获取基础Token数据的辅助函数
export function getBaseTokenData(baseTokenPath) {
  const [category, tokenName] = baseTokenPath.split('.')
  return baseTokens[category]?.[tokenName]
}

// 获取所有Token（每个组件Token展开为多行，每行代表一个样式属性）
export function getAllTokens() {
  const allTokens = []
  
  Object.entries(componentTokens).forEach(([category, categoryTokens]) => {
    Object.entries(categoryTokens).forEach(([name, token]) => {
      // 解析Token名称以提取变体和状态信息
      const nameParts = name.split('-')
      let variant = ''
      let componentState = ''
      
      // 分析Token名称结构
      if (nameParts.length >= 2) {
        const lastPart = nameParts[nameParts.length - 1]
        const stateKeywords = ['default', 'hover', 'active', 'disabled', 'focus', 'error', 'success']
        
        if (stateKeywords.includes(lastPart)) {
          componentState = lastPart
          variant = nameParts.slice(1, -1).join('-') // 去掉组件名和状态，保留变体部分
        } else {
          componentState = '不可交互'
          variant = nameParts.slice(1).join('-') // 去掉组件名，保留变体部分
        }
      }

      // 处理Token的样式属性
      if (token.styles) {
        // 新结构：每个Token包含多个样式属性
        Object.entries(token.styles).forEach(([styleProp, styleData]) => {
          const semanticTokenPath = styleData.semanticToken
          let semanticTokenData = null
          let baseTokenPath = ''
          let baseTokenData = null

          // 获取语义Token信息
          if (semanticTokenPath) {
            const [semanticCategory, semanticTokenName] = semanticTokenPath.split('.')
            semanticTokenData = semanticTokens[semanticCategory]?.[semanticTokenName]
            baseTokenPath = semanticTokenData?.baseToken
            baseTokenData = baseTokenPath ? getBaseTokenData(baseTokenPath) : null
          } else if (styleData.value) {
            // 处理直接值的情况
            baseTokenData = { value: styleData.value, type: styleProp, usage: '直接定义值' }
          }

          allTokens.push({
            componentToken: `${category}.${name}.${styleProp}`,
            componentName: category,
            variant: variant,
            componentState: componentState,
            componentUsage: `${token.usage} - ${styleProp}样式`,
            semanticToken: semanticTokenPath || '-',
            semanticType: semanticTokenData?.type || '-',
            semanticUsage: semanticTokenData?.usage || '-',
            baseToken: baseTokenPath || '-',
            baseType: baseTokenData?.type || styleProp,
            baseUsage: baseTokenData?.usage || '直接定义值',
            baseValue: baseTokenData?.value || styleData.value || '-'
          })
        })
      } else if (token.semanticToken) {
        // 兼容旧结构
        const semanticTokenPath = token.semanticToken
        const [semanticCategory, semanticTokenName] = semanticTokenPath.split('.')
        const semanticTokenData = semanticTokens[semanticCategory]?.[semanticTokenName]
        const baseTokenPath = semanticTokenData?.baseToken
        const baseTokenData = baseTokenPath ? getBaseTokenData(baseTokenPath) : null

        allTokens.push({
          componentToken: `${category}.${name}`,
          componentName: category,
          variant: variant,
          componentState: componentState,
          componentUsage: token.usage,
          semanticToken: semanticTokenPath || '',
          semanticType: semanticTokenData?.type || '',
          semanticUsage: semanticTokenData?.usage || '',
          baseToken: baseTokenPath || '',
          baseType: baseTokenData?.type || '',
          baseUsage: baseTokenData?.usage || '',
          baseValue: baseTokenData?.value || ''
        })
      }
    })
  })
  
  return allTokens
}

// 获取指定组件的Token
export function getComponentTokens(componentName) {
  const componentData = componentTokens[componentName]
  if (!componentData) return []

  const tokens = []
  Object.entries(componentData).forEach(([name, token]) => {
    // 解析Token名称以提取变体和状态信息
    const nameParts = name.split('-')
    let variant = ''
    let componentState = ''
    
    // 分析Token名称结构
    if (nameParts.length >= 2) {
      const lastPart = nameParts[nameParts.length - 1]
      const stateKeywords = ['default', 'hover', 'active', 'disabled', 'focus', 'error', 'success']
      
      if (stateKeywords.includes(lastPart)) {
        componentState = lastPart
        variant = nameParts.slice(1, -1).join('-') // 去掉组件名和状态，保留变体部分
      } else {
        componentState = '不可交互'
        variant = nameParts.slice(1).join('-') // 去掉组件名，保留变体部分
      }
    }

    // 处理Token的样式属性
    if (token.styles) {
      // 新结构：每个Token包含多个样式属性
      Object.entries(token.styles).forEach(([styleProp, styleData]) => {
        const semanticTokenPath = styleData.semanticToken
        let semanticTokenData = null
        let baseTokenPath = ''
        let baseTokenData = null

        // 获取语义Token信息
        if (semanticTokenPath) {
          const [semanticCategory, semanticTokenName] = semanticTokenPath.split('.')
          semanticTokenData = semanticTokens[semanticCategory]?.[semanticTokenName]
          baseTokenPath = semanticTokenData?.baseToken
          baseTokenData = baseTokenPath ? getBaseTokenData(baseTokenPath) : null
        } else if (styleData.value) {
          // 处理直接值的情况
          baseTokenData = { value: styleData.value, type: styleProp, usage: '直接定义值' }
        }

        tokens.push({
          componentToken: `${componentName}.${name}.${styleProp}`,
          componentName: componentName,
          variant: variant,
          componentState: componentState,
          componentUsage: `${token.usage} - ${styleProp}样式`,
          semanticToken: semanticTokenPath || '-',
          semanticType: semanticTokenData?.type || '-',
          semanticUsage: semanticTokenData?.usage || '-',
          baseToken: baseTokenPath || '-',
          baseType: baseTokenData?.type || styleProp,
          baseUsage: baseTokenData?.usage || '直接定义值',
          baseValue: baseTokenData?.value || styleData.value || '-'
        })
      })
    } else if (token.semanticToken) {
      // 兼容旧结构
      const semanticTokenPath = token.semanticToken
      const [semanticCategory, semanticTokenName] = semanticTokenPath.split('.')
      const semanticTokenData = semanticTokens[semanticCategory]?.[semanticTokenName]
      const baseTokenPath = semanticTokenData?.baseToken
      const baseTokenData = baseTokenPath ? getBaseTokenData(baseTokenPath) : null

      tokens.push({
        componentToken: `${componentName}.${name}`,
        componentName: componentName,
        variant: variant,
        componentState: componentState,
        componentUsage: token.usage,
        semanticToken: semanticTokenPath || '',
        semanticType: semanticTokenData?.type || '',
        semanticUsage: semanticTokenData?.usage || '',
        baseToken: baseTokenPath || '',
        baseType: baseTokenData?.type || '',
        baseUsage: baseTokenData?.usage || '',
        baseValue: baseTokenData?.value || ''
      })
    }
  })

  return tokens
}

// 更新Token值的函数
export function updateTokenValue(baseTokenPath, newValue) {
  const [category, tokenName] = baseTokenPath.split('.')
  const token = baseTokens[category]?.[tokenName]
  
  if (token) {
    // 记录历史
    const historyRecord = {
      timestamp: new Date().toISOString(),
      tokenPath: baseTokenPath,
      oldValue: token.value,
      newValue: newValue,
      action: 'update'
    }
    
    historyRecords.value.push(historyRecord)
    currentHistoryIndex.value = historyRecords.value.length - 1
    
    // 更新值
    token.value = newValue
    return true
  }
  return false
}

// 回滚历史记录
export function revertHistoryRecord(index) {
  const record = historyRecords.value[index]
  if (record && record.action === 'update') {
    const [category, tokenName] = record.tokenPath.split('.')
    const token = baseTokens[category]?.[tokenName]
    
    if (token) {
      token.value = record.oldValue
      
      // 创建回滚记录
      const revertRecord = {
        timestamp: new Date().toISOString(),
        tokenPath: record.tokenPath,
        oldValue: record.newValue,
        newValue: record.oldValue,
        action: 'revert',
        originalIndex: index
      }
      
      historyRecords.value.push(revertRecord)
      currentHistoryIndex.value = historyRecords.value.length - 1
      
      return true
    }
  }
  return false
}

// CSV导入功能 - 支持新的组件Token结构
export async function importTokensFromCSV(csvData) {
  // 清空现有Token
  Object.keys(baseTokens).forEach(category => {
    Object.keys(baseTokens[category]).forEach(key => {
      delete baseTokens[category][key]
    })
  })
  Object.keys(semanticTokens).forEach(category => {
    Object.keys(semanticTokens[category]).forEach(key => {
      delete semanticTokens[category][key]
    })
  })
  Object.keys(componentTokens).forEach(category => {
    Object.keys(componentTokens[category]).forEach(key => {
      delete componentTokens[category][key]
    })
  })

  const baseTokensMap = new Map()
  const semanticTokensMap = new Map()
  const componentTokensMap = new Map()

  // 第一遍：收集所有唯一的Token
  console.log('开始处理CSV数据，总行数：', csvData.length)
  csvData.forEach((row, index) => {
    console.log(`处理第 ${index + 1} 行:`, row)
    
    // 从CSV数据中提取字段
    const componentField = row['组件'] || row['componentName'] || row['Component'] || row['component']
    const variantField = row['变体'] || row['variant'] || row['Variant'] || row['variant']
    const stateField = row['状态'] || row['componentState'] || row['State'] || row['state']
    const tokenField = row['组件Token'] || row['componentToken'] || row['Component Token'] || row['component_token']

    console.log('原始字段值：', {
      componentField,
      variantField,
      stateField,
      tokenField,
      row
    })

    // 转换字段值
    const componentName = getComponentKeyFromLabel(componentField)
    const variantName = getVariantKeyFromLabel(variantField)
    const stateName = getStateKeyFromLabel(stateField)
    const styleProp = tokenField?.split('.')?.pop() || 'default'

    console.log('解析后的值：', {
      componentName,
      variantName,
      stateName,
      styleProp
    })

    // 基础Token逻辑
    if (row['基础Token'] || row['baseToken']) {
      const baseTokenName = row['基础Token'] || row['baseToken']
      const baseValue = row['基础值'] || row['baseValue']
      const baseType = getBaseTypeKeyFromLabel(row['基础类型'] || row['baseType'])
      const baseUsage = row['基础用途'] || row['baseUsage']
      
      console.log('基础Token数据：', {
        baseTokenName,
        baseValue,
        baseType,
        baseUsage,
        row
      })

      // 检查必要字段
      if (!baseTokenName || !baseValue || !baseType) {
        console.log('跳过不完整的基础Token数据', {
          baseTokenName,
          baseValue,
          baseType
        })
        return
      }

      // 检查Token名称格式
      const [category, name] = baseTokenName.split('.')
      if (!category || !name) {
        console.log('基础Token名称格式不正确', baseTokenName)
        return
      }

      // 验证基础值格式
      let isValidValue = true
      switch (baseType) {
        case 'color':
          isValidValue = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(baseValue)
          break
        case 'spacing':
        case 'typography':
          isValidValue = /^\d+(\.\d+)?(px|rem|em)$/.test(baseValue)
          break
        case 'border':
          isValidValue = /^\d+(\.\d+)?px$/.test(baseValue)
          break
      }

      if (!isValidValue) {
        console.log('基础Token值格式不正确', {
          baseValue,
          baseType,
          baseTokenName
        })
        return
      }

      // 创建或更新基础Token
      const categoryKey = category
      const tokenKey = name
      
      if (!baseTokensMap.has(`${categoryKey}.${tokenKey}`)) {
        baseTokensMap.set(`${categoryKey}.${tokenKey}`, {
          value: baseValue,
          type: baseType,
          usage: baseUsage || '',
          category: categoryKey
        })
      }
    }

    // 语义Token逻辑
    if (row['语义Token'] || row['semanticToken']) {
      const semanticTokenName = row['语义Token'] || row['semanticToken']
      const semanticType = getSemanticTypeKeyFromLabel(row['语义类型'] || row['semanticType'])
      const semanticUsage = row['语义用途'] || row['semanticUsage']
      const baseTokenPath = row['基础Token'] || row['baseToken']
      
      console.log('语义Token数据：', {
        semanticTokenName,
        semanticType,
        semanticUsage,
        baseTokenPath,
        row
      })

      // 检查必要字段
      if (!semanticTokenName || !semanticType || !baseTokenPath) {
        console.log('跳过不完整的语义Token数据', {
          semanticTokenName,
          semanticType,
          baseTokenPath
        })
        return
      }

      // 检查Token名称格式
      const [category, name] = semanticTokenName.split('.')
      if (!category || !name) {
        console.log('语义Token名称格式不正确', semanticTokenName)
        return
      }

      // 检查基础Token引用格式
      const [baseCategory, baseName] = baseTokenPath.split('.')
      if (!baseCategory || !baseName) {
        console.log('基础Token引用格式不正确', baseTokenPath)
        return
      }

      // 创建或更新语义Token
      if (!semanticTokensMap.has(semanticTokenName)) {
        semanticTokensMap.set(semanticTokenName, {
          value: name,
          type: semanticType,
          usage: semanticUsage || '',
          baseToken: baseTokenPath,
          category: category
        })
      }
    }

    // 组件Token逻辑 - 支持新的组件Token结构
    if (componentName && variantName) {
      let componentTokenKey = `${componentName}-${variantName}`
      if (stateName && stateName !== '不可交互') {
        componentTokenKey = `${componentTokenKey}-${stateName}`
      }
      
      const semanticTokenPath = row['语义Token'] || row['semanticToken']
      const componentUsage = row['组件用途'] || row['componentUsage'] || ''
      const componentTokenPath = row['组件Token'] || row['componentToken']
      const styleProp = componentTokenPath?.split('.')?.pop() || 'default'
      
      console.log('组件Token数据：', {
        componentTokenKey,
        semanticTokenPath,
        componentName,
        variantName,
        stateName,
        componentUsage,
        componentTokenPath,
        styleProp,
        row
      })
      
      // 检查必要字段
      if (!componentName || !variantName || !semanticTokenPath || !componentTokenPath) {
        console.log('跳过不完整的组件Token数据', {
          componentName,
          variantName,
          semanticTokenPath,
          componentTokenPath
        })
        return
      }
      
      // 创建或更新组件Token
      if (!componentTokensMap.has(componentTokenKey)) {
        componentTokensMap.set(componentTokenKey, {
          type: 'component',
          usage: componentUsage,
          styles: {}
        })
      }
      
      // 将样式属性添加到styles对象中
      const tokenData = componentTokensMap.get(componentTokenKey)
      if (!tokenData.styles) {
        tokenData.styles = {}
      }
      if (!tokenData.styles[styleProp]) {
        tokenData.styles[styleProp] = {}
      }
      tokenData.styles[styleProp].semanticToken = semanticTokenPath
      componentTokensMap.set(componentTokenKey, tokenData)
    }
  })

  // 准备新的数据结构
  const newBaseTokens = {}
  const newSemanticTokens = {}
  const newComponentTokens = {}

  // 重建baseTokens
  baseTokensMap.forEach((tokenData, key) => {
    const category = tokenData.category
    if (!newBaseTokens[category]) {
      newBaseTokens[category] = {}
    }
    const [, name] = key.split('.')
    if (name && tokenData.value !== undefined) {
      newBaseTokens[category][name] = {
        value: tokenData.value,
        type: tokenData.type || 'color',  // 提供默认类型
        usage: tokenData.usage || ''
      }
    } else {
      console.warn('跳过无效的基础Token:', { key, tokenData })
    }
  })

  // 重建semanticTokens
  semanticTokensMap.forEach((tokenData, key) => {
    const category = tokenData.category
    if (!newSemanticTokens[category]) {
      newSemanticTokens[category] = {}
    }
    const [, name] = key.split('.')
    if (name && tokenData.value !== undefined && tokenData.baseToken) {
      newSemanticTokens[category][name] = {
        value: tokenData.value,
        type: tokenData.type || 'background',  // 提供默认类型
        usage: tokenData.usage || '',
        baseToken: tokenData.baseToken
      }
    } else {
      console.warn('跳过无效的语义Token:', { key, tokenData })
    }
  })

  // 重建componentTokens - 支持新的组件Token结构
  componentTokensMap.forEach((tokenData, key) => {
    const [componentName, ...rest] = key.split('-')
    if (!componentName) {
      console.warn('跳过无效的组件Token:', { key, tokenData })
      return
    }

    if (!newComponentTokens[componentName]) {
      newComponentTokens[componentName] = {}
    }
    
    if (tokenData.styles && Object.keys(tokenData.styles).length > 0) {
      newComponentTokens[componentName][key] = {
        type: tokenData.type || 'component',  // 提供默认类型
        usage: tokenData.usage || '',
        styles: tokenData.styles
      }
    } else {
      console.warn('跳过无效的组件Token样式:', { key, tokenData })
    }
  })

  console.log('重建后的数据结构:', {
    baseTokens: newBaseTokens,
    semanticTokens: newSemanticTokens,
    componentTokens: newComponentTokens
  })

  // 一次性替换所有数据
  // 先创建临时的空对象
  const tempBaseTokens = {}
  const tempSemanticTokens = {}
  const tempComponentTokens = {}

  // 复制新数据到临时对象
  Object.assign(tempBaseTokens, newBaseTokens)
  Object.assign(tempSemanticTokens, newSemanticTokens)
  Object.assign(tempComponentTokens, newComponentTokens)

  // 清空原有数据
  Object.keys(baseTokens).forEach(key => delete baseTokens[key])
  Object.keys(semanticTokens).forEach(key => delete semanticTokens[key])
  Object.keys(componentTokens).forEach(key => delete componentTokens[key])

  // 使用临时对象更新原有数据
  Object.assign(baseTokens, tempBaseTokens)
  Object.assign(semanticTokens, tempSemanticTokens)
  Object.assign(componentTokens, tempComponentTokens)

  // 返回导入的数据统计
  console.log('导入的数据：', {
    baseTokens: Array.from(baseTokensMap.keys()),
    semanticTokens: Array.from(semanticTokensMap.keys()),
    componentTokens: Array.from(componentTokensMap.keys()),
    rawData: csvData
  })
  
  // 使用getAllTokens来获取完整的Token数据
  const allTokens = getAllTokens()
  const uniqueBaseTokenNames = new Set()
  const uniqueSemanticTokenNames = new Set()
  const uniqueComponentTokenNames = new Set()

  allTokens.forEach(token => {
    if (token.baseToken) uniqueBaseTokenNames.add(token.baseToken)
    if (token.semanticToken) uniqueSemanticTokenNames.add(token.semanticToken)
    if (token.componentToken) {
      // 只取组件Token的主要部分（不包含样式属性）
      const mainPart = token.componentToken.split('.').slice(0, 2).join('.')
      uniqueComponentTokenNames.add(mainPart)
    }
  })

  console.log('统计结果：', {
    baseTokens: Array.from(uniqueBaseTokenNames),
    semanticTokens: Array.from(uniqueSemanticTokenNames),
    componentTokens: Array.from(uniqueComponentTokenNames)
  })

  return {
    baseTokenCount: uniqueBaseTokenNames.size,
    semanticTokenCount: uniqueSemanticTokenNames.size,
    componentTokenCount: uniqueComponentTokenNames.size,
    totalRows: csvData.length
  }
}

// CSV导入辅助函数
function getComponentKeyFromLabel(label) {
  const componentLabels = {
    '按钮': 'button',
    '输入框': 'input',
    '通用': 'common'
  }
  return componentLabels[label] || label
}

function getVariantKeyFromLabel(label) {
  const variantLabels = {
    // 按钮变体 - 按完整组合定义
    '主按钮': 'primary',
    '次要按钮': 'secondary',
    '小尺寸主按钮': 'primary-small',
    '大尺寸主按钮': 'primary-large',
    
    // 输入框变体 - 按完整组合定义
    '标准输入框': 'standard',
    '小尺寸输入框': 'small',
    '大尺寸输入框': 'large',
    
    // 通用变体 - 保持原有逻辑
    '主要文字': 'text-primary',
    '次要文字': 'text-secondary',
    '弱化文字': 'text-muted',
    '主要背景': 'bg-primary',
    '次要背景': 'bg-secondary',
    '主要边框': 'border-primary',
    '细微边框': 'border-subtle',
    '紧凑间距': 'spacing-compact',
    '舒适间距': 'spacing-cozy',
    '宽松间距': 'spacing-comfortable',
    '宽敞间距': 'spacing-spacious',
    '正文字体': 'typography-body',
    '标题字体': 'typography-heading',
    '小字体': 'typography-small',
    '强调字重': 'typography-emphasis',
    '细微圆角': 'radius-subtle',
    '适中圆角': 'radius-moderate',
    '明显圆角': 'radius-prominent'
  }
  return variantLabels[label] || label
}

function getStateKeyFromLabel(label) {
  const stateLabels = {
    '默认': 'default',
    '悬停': 'hover',
    '激活': 'active',
    '禁用': 'disabled',
    '聚焦': 'focus',
    '错误': 'error',
    '不可交互': ''
  }
  return stateLabels[label] || label
}

function getBaseTypeKeyFromLabel(label) {
  const typeLabels = {
    '颜色': 'color',
    '间距': 'spacing',
    '字体': 'typography',
    '边框': 'border'
  }
  return typeLabels[label] || label
}

function getSemanticTypeKeyFromLabel(label) {
  const typeLabels = {
    '背景': 'background',
    '文字': 'text',
    '边框': 'border',
    '间距': 'spacing',
    '字体': 'typography'
  }
  return typeLabels[label] || label
}