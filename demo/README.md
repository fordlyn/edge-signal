# Neon Broadcast // Frontend Design Spec
> **Project Code**: NEON_BROADCAST_V1  
> **Style**: Industrial Cyberpunk / High-Tech Interface  
> **Status**: Prototype Complete  

## 1. 核心理念 (Core Concept)

本项目旨在构建一个**工业赛博朋克风格**的博客前端系统。设计语言不仅仅停留在“霓虹光效”，更强调**机械结构的硬朗感**、**数据终端的交互隐喻**以及**深空网格的空间感**。

- **隐喻**：博客是一个向外层网格广播信号的“节点 (Node)”。
- **用户**：访客被视为“接入者”，管理员被视为“操作员”。
- **故障美学**：接受并利用 Glitch、扫描线和噪点作为视觉特征。

## 2. 设计系统 (Design System)

### 2.1 色彩体系 (Color Palette)

系统使用 CSS 变量进行全局管理，核心基调为“深邃虚空 + 高能霓虹”。

| 变量名 | 色值 | 用途 |
| :--- | :--- | :--- |
| `--bg-core` | `#03050d` | 核心背景（近乎黑的深蓝） |
| `--bg-horizon` | `#0a0f24` | 远景渐变色 |
| `--bg-panel` | `rgba(4, 12, 24, 0.85)` | 磨砂面板背景 |
| `--accent-cyan` | `#19f7ff` | **主强调色** (链接、按钮、扫描线) |
| `--accent-magenta` | `#ff4fd8` | **次强调色** (警告、状态、副标题) |
| `--accent-amber` | `#ffc857` | **辅助色** (进度条、特殊标记) |
| `--text-bright` | `#f4ffff` | 高亮文本 |
| `--text-soft` | `#9fbcd6` | 正文文本 (蓝灰色调，降低视觉疲劳) |

### 2.2 排版与字体 (Typography)

采用“混合字体栈”策略，在保证中文易读性的同时，最大化保留工业科幻风味。

| 类别 | 变量名 | 字体组合 | 风格描述 |
| :--- | :--- | :--- | :--- |
| **标题** | `--font-display` | `Orbitron` + `ZCOOL QingKe HuangYou` | **工业/硬朗**。黄油体的方正感如同集装箱喷漆。 |
| **正文** | `--font-body` | `Noto Sans SC` + `sans-serif` | **现代/清晰**。使用思源黑体确保长时间阅读舒适度。 |
| **数据/代码** | `--font-mono` | `Share Tech Mono` + `Noto Sans SC` | **机械/终端**。保留英文等宽字体的技术感。 |

**HTML 配置**：所有页面均设置为 `<html lang="zh-CN">`。

### 2.3 关键 UI 特征

- **切角容器 (Angled Containers)**：
  不使用圆角 (border-radius)，而是使用 `clip-path` 切割矩形的角落，模拟装甲板或芯片外观。
  ```css
  clip-path: polygon(
      20px 0, 100% 0, 
      100% calc(100% - 20px), calc(100% - 20px) 100%, 
      0 100%, 0 20px
  );
  ```

- **全息网格 (Holographic Grid)**：
  使用 CSS `linear-gradient` 和 `perspective` 变换创建具有景深的 3D 地面网格。

- **扫描线 (Scanlines)**：
  覆盖在屏幕顶层的微弱横纹和偶尔扫过的光带，模拟 CRT 显示器或老式数据终端。

## 3. 页面架构 (Page Structure)

所有文件位于 `@technology/` 根目录。

### 3.1 接入层
- **`login.html` (节点接入)**
    - **功能**：系统身份验证。
    - **亮点**：输入框浮动标签动画、提交后的“链路建立”进度条模拟。

### 3.2 核心层
- **`index.html` (数据看板/首页)**
    - **功能**：展示文章流、系统状态、实时日志。
    - **亮点**：固定顶部导航、全屏 3D 网格背景、卡片悬停解码动效。

- **`post.html` (档案读取)**
    - **功能**：沉浸式文章阅读。
    - **亮点**：模拟终端代码块 (Terminal Block)、高亮提示框、单栏阅读布局。

- **`about.html` (操作员档案)**
    - **功能**：个人介绍与技能展示。
    - **亮点**：头像旋转扫描框、技能条可视化、身份卡片布局。

### 3.3 异常层
- **`404.html` (信号丢失)**
    - **功能**：错误处理。
    - **亮点**：CSS Glitch (故障) 动画文字、红色警报色调、扫描线干扰增强。

## 4. 扩展指南 (Dev Guide)

### 新增页面
1.  **引入头部**：复制任意现有页面的 `<head>` 部分，确保包含 Google Fonts 链接和 CSS 变量定义。
2.  **设置字体**：`body { font-family: var(--font-body); }`。
3.  **复用组件**：
    - 导航栏：`.navbar`
    - 卡片：`.card`
    - 按钮：`.action-btn` 或 `.submit-btn`

### 修改配色
直接在 `:root` 中修改 `--accent-cyan` 等变量即可实现全局主题色变更（例如改为“橙色警戒”风格）。

---
*文档生成时间: 2025-12-27* // *操作员: Codex*
