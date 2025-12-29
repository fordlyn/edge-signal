# 标准发布流程：MDX 文章发布 (Git as CMS)

本项目采用 **MDX 文件 + Git 提交** 作为内容管理方式：文章与代码同仓库、同审查、同部署。Vercel 会在每次提交/合并后自动构建并发布。

同时，我们提供了一套“Neon Broadcast”风格的 **MDX 文章组件库** 与 **默认 Markdown 美化映射**：即使只写 Markdown 语法，也会自动渲染为赛博终端/情报面板风格。

## 1. 目录结构

- 文章目录：`content/posts/`
- 单篇文章：`content/posts/<slug>.mdx`

示例：
- `content/posts/bioluminescent-garden.mdx`

## 2. 文件命名（Slug 规则）

- 文件名即文章 `slug`
- 推荐：小写英文 + 连字符（kebab-case）
- 允许：纯英文数字和 `-`

> 说明：系统支持中文标签/分类，但 `slug` 建议保持英文，便于分享与迁移。

## 3. 必须提供的元数据 (metadata)

每个 MDX 文件顶部必须导出 `metadata`：

```mdx
export const metadata = {
  title: "文章标题",
  date: "2084-12-25",
  excerpt: "摘要（列表页使用）",
  tags: ["控制论", "霓虹"],
  category: "关键",
  source: "节点_77",
};
```

字段约束：
- `title`: string
- `date`: string，推荐 `YYYY-MM-DD`
- `excerpt`: string，建议 40–120 字（列表/检索页展示）
- `tags`: string[]（可包含中文）
- `category`: string（建议固定集合，比如：关键/资讯/研究）
- `source`: string（Neon Broadcast 信息源展示）

## 4. 写作规范（推荐）

### 4.1 基础写作

- 内容从一个 `#` 标题开始（建议与 `metadata.title` 一致）
- 使用二级标题 `##` 拆分段落
- 重要段落用 `>` 引用强调
- 代码块优先使用 fenced code：

```md
```ts
console.log("hello")
```
```

### 4.2 JSX/组件块的排版习惯

MDX 允许在文章中直接写 JSX 组件（比如 `<DataPanel />`）。为了保证 HTML 结构稳定且便于阅读：

- JSX 组件前后都建议留一个空行
- 不要把 JSX 组件塞进一句话中间（例如不要写：`这一句 <DataPanel .../> 继续这一句`）

> 说明：项目已经对部分“MDX 把块级节点包进段落”导致的 hydration 问题做了兼容处理，但依然推荐保持上述写作习惯。

## 5. 默认 Markdown 美化映射（无需显式使用组件）

本项目已在 `mdx-components.tsx` 中做了全局映射：

- `>` 引用块：自动渲染为 `SignalQuote`（切角引用面板）
- 代码块：自动渲染为 `TerminalBlock`（终端窗口风格）
- `---` 分割线：自动渲染为霓虹渐变 `hr`
- 图片 `![]()`：自动渲染为 `HoloImage`（全息框 + 扫描线叠层）

因此：写“纯 Markdown”，也能获得 Neon Broadcast 的视觉层次。

## 6. MDX 文章组件库（可选增强）

组件目录：`components/mdx/`

这些组件已全局注册到 MDX（无需 import，直接在文章中使用）：

- `DataPanel`：情报面板（支持 `tone/badge/index/footer`）
- `SignalAlert`：提示/警告/危险框（`variant=info|warning|danger|success`）
- `SystemMetric`：指标卡（适合展示 build/性能/参数）
- `TerminalBlock`：终端块（通常由代码块自动生成，也可显式用）
- `SignalQuote`：引用面板（通常由 `>` 自动生成，也可显式用）
- `HoloImage`：全息图片框（通常由 Markdown 图片自动生成；显式用可传 `caption`）

### 6.1 DataPanel（含落款 footer）

```mdx
<DataPanel
  title="任务摘要"
  tone="cyan"
  badge="FIELD"
  index="01"
  footer={{ left: "SRC: 节点_77", right: "TS: 2084-12-25" }}
>
  进入第四扇区边缘温室。
  目标：确认光谱脉冲是否为“信号”。
</DataPanel>
```

### 6.2 SignalAlert

```mdx
<SignalAlert variant="warning" title="通讯异常">
  每当蓝光脉冲达到峰值，音频频道会被静电噪音淹没。
</SignalAlert>
```

### 6.3 SystemMetric

```mdx
<div className="flex flex-wrap gap-4 my-10">
  <SystemMetric label="Build" value="PASS" note="next build" accent="cyan" />
  <SystemMetric label="Risk" value="LOW" note="no DB" accent="magenta" />
</div>
```

### 6.4 图片与 caption

- Markdown 图片：`![alt](/images/posts/<slug>/cover.png)`（自动 HoloImage）
- 需要 caption 时，显式写组件：

```mdx
<HoloImage src="/next.svg" alt="Neon Broadcast Asset" caption="ASSET // /next.svg" />
```

## 7. 图片与静态资源

推荐方式：把图片放在 `public/` 下，并用绝对路径引用。

建议目录：
- `public/images/posts/<slug>/...`

## 8. 本地预览

- 启动开发服务器：`npm run dev`
- 打开：`http://localhost:3000`
- 文章页：`/post/<slug>`
- 归档：`/archive`
- 标签：`/tags`
- 搜索：`/search`

## 9. 样式验收（强烈建议每次大改后跑一遍）

项目提供了一篇“验收文章”，覆盖所有常见 Markdown 格式与所有独特 MDX 组件组合：

- 文件：`content/posts/mdx-style-audit.mdx`
- 页面：`/post/mdx-style-audit`

验收重点：
- 引用块/终端块/图片是否自动美化
- `DataPanel` 的 header/footer 是否对齐、是否出现多余底部留白
- 列表与段落的最后一项是否不再额外留 `margin-bottom`

## 10. 发布到线上（Vercel）

### 方式 A：直接提交到 main（最快）
1. 新增/修改 `content/posts/*.mdx`
2. `git commit` + `git push`
3. Vercel 自动构建并更新 Production

### 方式 B：PR 审核发布（推荐）
1. 创建分支：`git checkout -b post/<slug>`
2. 新增文章：`content/posts/<slug>.mdx`
3. 推送并发起 PR
4. 使用 Vercel Preview URL 校对样式与内容
5. PR 合并后自动发布到 Production

## 11. 常见问题

### Q1: 我能用 YAML frontmatter 吗？
当前内容系统使用 `export const metadata = { ... }` 的方式管理元数据。

原因：Next.js 官方 MDX 支持里，MDX 文件天然支持导出变量；而 YAML frontmatter 需要额外解析/插件，容易产生不同环境差异。

### Q2: 中文标签链接是否安全？
安全。路由生成时会自动做 URL 编码；代码中也对标签参数做了编码处理。

### Q3: 为什么有时段落会变成 div？
为了避免 MDX 生成的块级内容（如图片自动变 `figure`）被包进 `p` 导致的非法 HTML 嵌套与 hydration 错误，系统会在必要时把段落容器替换成 `div`。这对样式不应有负面影响，并能显著提升稳定性。
