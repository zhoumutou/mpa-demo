# mpa-demo

> 基于 Vite 的多页面（MPA）示例项目，演示如何结合自定义插件（[@zhoumutou/vite-plugin-mpa](https://github.com/zhoumutou/vite-plugin-mpa) & [@zhoumutou/vite-plugin-inline](https://github.com/zhoumutou/vite-plugin-inline)）实现多入口开发、构建与内联优化。

中文 | [English](./README.en.md)

## 目录

- [mpa-demo](#mpa-demo)
  - [目录](#目录)
  - [背景与目标](#背景与目标)
  - [特性](#特性)
  - [环境要求](#环境要求)
  - [快速开始](#快速开始)
  - [常用脚本](#常用脚本)
  - [环境变量说明](#环境变量说明)
  - [多页面策略说明](#多页面策略说明)
  - [内联资源优化说明](#内联资源优化说明)
  - [开发调试建议](#开发调试建议)
  - [FAQ](#faq)
  - [相关链接](#相关链接)
  - [License](#license)

## 背景与目标

本仓库用于示例/验证：

1. 多入口 HTML + 独立 JS/CSS 构建产物。
2. 构建阶段按页面裁剪资源，避免单页打包过重。
3. 通过内联插件对关键首屏脚本/样式进行轻量内联，加快呈现。

## 特性

- 基于 Vite & PNPM
- 最低 Node 版本要求：>= 22
- 多页面自动发现（借助 `@zhoumutou/vite-plugin-mpa`）
- 关键资源可选择内联（借助 `@zhoumutou/vite-plugin-inline`）
- .env 环境配置区分（dev / build）
- 统一 Lint（`pnpm lint`）

## 环境要求

| 组件     | 要求                           |
| -------- | ------------------------------ |
| Node     | >= 22                          |
| 包管理器 | pnpm                           |
| 操作系统 | macOS / Linux / Windows (均可) |

## 快速开始

```bash
# 克隆
git clone https://github.com/zhoumutou/mpa-demo.git
cd mpa-demo

# 配置环境变量
cp .env.example .env

# 安装依赖
pnpm i

# 启动开发（自动多页面热更新）
pnpm dev
```

访问控制台输出的各个页面地址即可。

## 常用脚本

| 命令         | 说明                             |
| ------------ | -------------------------------- |
| `pnpm dev`   | 开发模式，启动本地多页面服务     |
| `pnpm check` | 质量检查                         |
| `pnpm lint`  | 代码风格/质量检查                |
| `pnpm build` | 生产构建                         |
| `pnpm debug` | 启动带调试（可能含额外日志）模式 |

## 环境变量说明

```bash
# .env.example (复制为 .env 后再按需修改)
# 可放置：
# VITE_API_BASE_URL=https://api.example.com
# VITE_INLINE_THRESHOLD=1024
```

建议：

- 公共常量放 `.env`
- 本地私密或差异化放 `.env.local`（如果已启用）
- 构建差异可借助 `MODE` 与 `import.meta.env`

## 多页面策略说明

借助 `@zhoumutou/vite-plugin-mpa`：

- 自动扫描约定目录（如 `src/pages/*/index.html` 或同类模式，具体以插件配置为准）
- 每个页面生成独立入口与资源清单
- 页面间只共享真正的公共依赖（如框架运行时）

## 内联资源优化说明

通过 `@zhoumutou/vite-plugin-inline` 可：

- 将体积极小或首屏关键 CSS/JS 直接内联插入 HTML
- 降低额外网络请求，改善首包体验
- 可设置大小阈值或精确匹配模式

典型策略：

1. `runtime` / `manifest` 级极小脚本内联
2. 关键首屏折叠区 CSS 内联
3. 其余资源保持缓存友好外链

## 开发调试建议

- 页面新增后无需重启（若插件支持热发现）
- 使用 DevTools 观察每个页面的独立资源装载情况
- 生产构建后检查：
  - 各页面 HTML 中是否存在期望的内联片段
  - 资源拆分是否合理（无巨型 JS）
  - HTTP 请求数量与体积

## FAQ

| 问题                   | 提示                                 |
| ---------------------- | ------------------------------------ |
| 页面新增未生效         | 检查目录命名是否符合插件约定         |
| 内联过多导致 HTML 过大 | 适当下调阈值或改为外链               |
| 构建产物过多           | 考虑拆分真正需要的页面或合并低频页面 |

## 相关链接

- 多页面插件：[@zhoumutou/vite-plugin-mpa](https://github.com/zhoumutou/vite-plugin-mpa)
- 内联插件：[@zhoumutou/vite-plugin-inline](https://github.com/zhoumutou/vite-plugin-inline)

## License

MIT
