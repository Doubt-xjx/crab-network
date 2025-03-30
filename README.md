# 蟹联网官网

这是一个基于 React 18 和 TypeScript 开发的蟹联网官方网站项目。项目采用了现代化的前端技术栈，实现了响应式设计，确保在不同设备上都能提供良好的用户体验。

## 技术栈

- React 18
- TypeScript
- React Router 6
- Styled Components
- Three.js (用于首页 3D 场景)
- Sass

## 项目结构

```
crab-network/
├── public/             # 静态资源
├── src/                # 源代码
│   ├── assets/         # 资源文件（图片、图标等）
│   ├── components/     # 可复用组件
│   ├── context/        # React 上下文
│   ├── hooks/          # 自定义 Hooks
│   ├── layouts/        # 布局组件
│   ├── pages/          # 页面组件
│   ├── services/       # API 服务
│   ├── styles/         # 样式文件
│   ├── utils/          # 工具函数
│   ├── App.tsx         # 主应用组件
│   └── index.tsx       # 应用入口
├── package.json        # 项目依赖和脚本
└── tsconfig.json       # TypeScript 配置
```

## 功能特点

1. **现代化界面设计**：采用简洁、专业的设计风格，符合企业形象
2. **响应式布局**：适配不同屏幕尺寸，提供一致的用户体验
3. **首页三维场景**：使用 Three.js 创建互动式 3D 背景效果
4. **多页面结构**：包含首页、产品、解决方案、新闻资讯和关于我们等页面

## 开发指南

### 项目启动

1. 克隆项目到本地
```bash
git clone <项目仓库地址>
```

2. 安装依赖
```bash
cd crab-network
npm install
```

3. 启动开发服务器
```bash
npm start
```
这将启动开发服务器并在浏览器中打开 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

构建完成后，生成的静态文件将位于 `build` 目录中，可以部署到任何静态文件服务器。

## 项目配置

### 环境变量

在项目根目录创建 `.env` 文件可以配置环境变量：

```
REACT_APP_API_URL=https://api.example.com
```

### 自定义配置

如需更改默认配置，可查看 Create React App 的文档：https://create-react-app.dev/docs/advanced-configuration

## 扩展开发

### 添加新页面

1. 在 `src/pages` 目录下创建新的页面组件
2. 在 `App.tsx` 中添加对应的路由配置

### 修改样式

- 全局样式位于 `src/styles/globals.scss`
- 组件特定样式使用 Styled Components 或在对应组件目录中的 SCSS 文件

## 注意事项

- 项目中使用的图片资源需要替换为实际的图片
- 三维场景目前使用了简单的占位几何体，后续可以替换为更复杂的 3D 模型
- 各页面中的链接地址需要根据实际情况配置

## 许可证

该项目遵循 MIT 许可证。详见 LICENSE 文件。
