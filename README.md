# T-ICE Rive Animation Demo

基于 Rive 的交互式充电器屏幕动画演示。

## 功能

- 4 种动画状态切换：Welcome、Charging、ChargingLongTime、Out
- 支持 WebGL2 渲染，带羽化/模糊效果
- 响应式布局，适配不同屏幕尺寸

## 本地开发

```bash
npm install
npm run dev
```

## 构建部署

```bash
npm run build
```

构建产物在 `dist/` 目录，可直接部署到 GitHub Pages。

## GitHub Pages 部署

1. 运行 `npm run build`
2. 将 `dist/` 目录内容推送到 `gh-pages` 分支，或在仓库设置中选择从 `dist` 目录部署

## 技术栈

- React 19
- Vite 7
- Rive (WebGL2)

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
