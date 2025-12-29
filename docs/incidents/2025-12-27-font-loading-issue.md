# 故障记录：Next.js 迁移中字体加载失效

**日期**：2025-12-27
**状态**：已解决 (Fix Verified)
**优先级**：中

## 问题描述
在将 `@demo/` 的静态页面迁移至 Next.js (App Router) + Tailwind v4 时，最初发现自定义字体（Orbitron 和 ZCOOL QingKe HuangYou）未能正确加载，导致页面回退到了系统默认字体。

## 技术上下文
- **框架**：Next.js 16.1.1 (Turbopack)
- **样式**：Tailwind CSS v4
- **字体方案**：`next/font/google` + CSS Variables

## 根本原因分析
问题出在 CSS 变量的作用域隔离以及 Next.js 字体变量注入位置不当。

1.  **CSS 变量作用域冲突**：最初在 `app/layout.tsx` 中，Next.js 的字体变量被注入到了 `<body>` 标签。然而，在 `app/globals.css` 中，我们在 `:root` (即 `<html>`) 级别定义字体栈（`--font-display: var(--font-orbitron)...`）。由于 `:root` 是 `<body>` 的父级，它无法读取定义在子元素 `<body>` 上的变量，导致 `--font-display` 解析为空或无效值。
2.  **字体引入缺失**：最初的 `layout.tsx` 遗漏了用于中文标题的关键字体 `ZCOOL QingKe HuangYou`。
3.  **Tailwind v4 映射问题**：旧的配置尝试直接在 `@theme` 中引用未在全局作用域生效的变量，且组件代码使用了动态生成的类名 `font-[var(--font-display)]`，这在变量失效时没有任何回退能力。

## 解决方案 (已实施)

### 1. 调整变量注入位置 (`app/layout.tsx`)
将字体变量类名从 `<body>` 提升到 `<html>` 标签，确保它们在 `:root` 作用域可用：

```typescript
// 注入到 html 标签，使其成为全局 :root 变量
<html lang="zh-CN" className={`${notoSansSC.variable} ${orbitron.variable} ${zcool.variable} ${shareTechMono.variable}`}>
  <body className="antialiased">
    {children}
  </body>
</html>
```

### 2. 重构全局样式 (`app/globals.css`)
在 `:root` 中显式定义字体栈，并在 Tailwind v4 `@theme` 中引用这些全局变量：

```css
:root {
  /* 定义字体栈，确保在 :root 层级能读取到 html 上的字体变量 */
  --font-display: var(--font-orbitron), var(--font-zcool), sans-serif;
  --font-body: var(--font-noto-sans), sans-serif;
  --font-mono: var(--font-share-mono), var(--font-noto-sans), monospace;
}

@theme inline {
  /* 引用已定义好的全局 CSS 变量 */
  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --font-mono: var(--font-mono);
}
```

### 3. 标准化组件类名
将组件中脆弱的 `font-[var(--font-display)]` 替换为标准的 Tailwind 工具类：

```tsx
// Before
<h1 className="font-[var(--font-display)] ...">

// After
<h1 className="font-display ...">
```

## 验证结果
- **构建状态**：`npm run build` 成功。
- **视觉验证**：Chrome DevTools 截图确认标题正确显示为 Orbitron/站酷黄油体，正文为 Noto Sans SC。
- **作用域检查**：确认 `html` 标签上存在 CSS 变量定义，且计算样式中 `--font-display` 解析正确。

## 经验总结
- **CSS 变量作用域**：当 CSS 变量相互引用时，依赖项（如 `--font-orbitron`）必须定义在引用项（如 `--font-display`）的同级或上级作用域。不能在父级引用子级的变量。
- **Next.js 字体注入**：最佳实践是将 `next/font` 变量注入到 `<html>` 而非 `<body>`，以便全局 CSS (`:root`) 可以安全地引用它们。
- **Tailwind 工具类**：优先使用配置好的工具类（如 `font-display`）而非任意值（`font-[...]`），前者通常有更好的维护性和回退机制。
