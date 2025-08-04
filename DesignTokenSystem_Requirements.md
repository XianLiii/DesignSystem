# Design Token System 需求文档

## 1. 项目概述

本项目是一个设计令牌（Design Token）管理系统，用于管理和维护设计系统中的设计令牌。系统采用三层令牌结构：基础令牌（Base Token）、语义令牌（Semantic Token）和组件令牌（Component Token）。

### 1.1 技术栈要求
- Python 3.8+
- PyQt6
- pandas（用于CSV/Excel处理）
- openpyxl（用于Excel支持）

### 1.2 基本架构
- 采用 MVC 架构
- 使用响应式数据管理
- 支持文件导入/导出
- 支持修改历史记录和回滚

## 2. 核心功能需求

### 2.1 数据结构

#### 2.1.1 基础令牌（Base Token）
```python
class BaseToken:
    category: str  # 类别，如 'colors', 'spacing', 'typography', 'border'
    name: str      # 令牌名称
    value: str     # 具体值
    type: str      # 类型（color/spacing/typography/border）
    usage: str     # 用途说明
```

#### 2.1.2 语义令牌（Semantic Token）
```python
class SemanticToken:
    category: str     # 类别，如 'surface', 'text', 'border'
    name: str        # 令牌名称
    type: str        # 类型（background/text/border/spacing/typography）
    usage: str       # 用途说明
    base_token: str  # 引用的基础令牌
```

#### 2.1.3 组件令牌（Component Token）
```python
class ComponentToken:
    component: str    # 组件名称（button/input/common）
    variant: str     # 变体名称
    state: str       # 状态（default/hover/active/disabled等）
    type: str        # 类型（component）
    usage: str       # 用途说明
    styles: dict     # 样式属性映射到语义令牌
```

### 2.2 用户界面需求

#### 2.2.1 主窗口布局
- 顶部导航栏，包含以下页面切换：
  - Design Token 概述
  - 全量 Token
  - Button 组件
  - Input 组件

#### 2.2.2 统计卡片组件
- 以卡片形式展示统计数据
- 包含大号数字显示
- 支持自适应布局
- 统计项目：
  - 组件数量
  - 组件Token数量（基于组件Token名称去重）
  - 语义Token数量（基于语义Token名称去重）
  - 基础Token数量（基于基础Token名称去重）

#### 2.2.3 Token表格组件
- 支持以下列：
  - 序号（从1开始的行号）
  - 组件
  - 变体
  - 状态
  - 组件Token
  - 组件用途
  - 语义类型
  - 语义Token
  - 语义用途
  - 基础类型
  - 基础Token
  - 基础值
  - 基础用途
- 表格特性：
  - 自适应列宽
  - 表头固定
  - 水平滚动
  - 紧凑布局
  - 标签式显示（不同类型使用不同颜色背景）

#### 2.2.4 筛选器组件
- 支持以下筛选条件：
  - 组件筛选
  - 变体筛选
  - 状态筛选
  - 组件Token筛选
  - 语义类型筛选
  - 基础类型筛选
  - 组件Token名称筛选
  - 语义Token名称筛选
  - 基础Token名称筛选
  - 搜索框（支持模糊搜索）

### 2.3 功能需求

#### 2.3.1 文件导入/导出
- 支持CSV文件导入/导出
- 支持Excel文件（.xlsx/.xls）导入
- 导入要求：
  - 验证表头格式
  - 验证必填字段
  - 验证数据格式
  - 支持UTF-8编码
  - 处理BOM标记
- 导出要求：
  - 使用原始值（非显示值）
  - UTF-8编码
  - 标准CSV格式

#### 2.3.2 修改历史记录
- 记录所有基础Token值的修改
- 支持查看修改历史
- 支持回滚操作
- 每条记录包含：
  - 时间戳
  - 修改的Token
  - 旧值
  - 新值
  - 回滚按钮

#### 2.3.3 数据验证
- 基础Token值格式验证：
  - 颜色：#RRGGBB 或 rgb(r,g,b)
  - 间距：数字+px/rem/em
  - 字体：数字+px/rem/em
  - 边框：数字+px
- Token名称格式验证：
  - 类别.名称格式
  - 不允许特殊字符
- 必填字段验证

#### 2.3.4 动态统计
- 实时计算统计数据
- 根据筛选条件动态更新
- 确保唯一性统计准确

### 2.4 组件页面需求

#### 2.4.1 Button组件页面
- 显示组件统计信息
- 显示组件Token表格
- 支持筛选和搜索
- 统计信息包含：
  - 组件数量（固定为1）
  - 组件Token数量
  - 语义Token数量
  - 基础Token数量

#### 2.4.2 Input组件页面
- 与Button组件页面结构相同
- 显示Input相关的Token信息
- 支持相同的筛选和搜索功能

## 3. 性能需求

### 3.1 响应时间
- 页面切换：≤ 100ms
- 筛选操作：≤ 200ms
- 文件导入（1000行以内）：≤ 3s
- 文件导出：≤ 1s

### 3.2 资源占用
- 内存占用：≤ 200MB
- CPU使用率（正常操作）：≤ 10%
- CPU使用率（文件操作）：≤ 30%

## 4. 数据持久化

### 4.1 文件存储
- Token数据保存为JSON格式
- 支持自动保存
- 支持数据备份
- 保存历史记录

### 4.2 数据格式
```json
{
  "baseTokens": {
    "colors": {
      "primary-500": {
        "value": "#191919",
        "type": "color",
        "usage": "基础主要色调值"
      }
    }
  },
  "semanticTokens": {
    "surface": {
      "primary-surface": {
        "value": "primary-500",
        "type": "background",
        "usage": "主要交互表面的背景色",
        "baseToken": "colors.primary-500"
      }
    }
  },
  "componentTokens": {
    "button": {
      "button-primary-default": {
        "type": "component",
        "usage": "主按钮默认状态的完整样式组合",
        "styles": {
          "background": {
            "semanticToken": "surface.primary-surface"
          }
        }
      }
    }
  }
}
```

## 5. 错误处理

### 5.1 文件操作错误
- 文件不存在
- 文件格式错误
- 编码错误
- 权限错误

### 5.2 数据验证错误
- 格式验证失败
- 必填字段缺失
- 引用关系错误

### 5.3 错误提示
- 使用对话框显示错误信息
- 提供错误原因和建议解决方案
- 支持错误日志记录

## 6. 界面规范

### 6.1 颜色规范
- 主色：#191919
- 次要色：#999999
- 背景色：#FFFFFF
- 边框色：#E5E5E5
- 文字色：
  - 主要：#111827
  - 次要：#737373
  - 禁用：#A3A3A3

### 6.2 尺寸规范
- 内间距：16px
- 外间距：24px
- 边框圆角：4px
- 字体大小：
  - 小：14px
  - 正文：16px
  - 标题：24px
  - 大标题：40px

### 6.3 交互规范
- 按钮悬停效果
- 输入框聚焦效果
- 表格行悬停效果
- 筛选器下拉效果
- 标签式显示效果

## 7. 其他要求

### 7.1 国际化
- 默认使用简体中文
- 支持后续扩展其他语言

### 7.2 可扩展性
- 支持新增Token类型
- 支持新增组件
- 支持自定义验证规则
- 支持自定义统计逻辑

### 7.3 日志记录
- 记录用户操作
- 记录错误信息
- 记录性能指标

### 7.4 帮助文档
- 提供用户使用手册
- 提供Token命名规范
- 提供开发文档