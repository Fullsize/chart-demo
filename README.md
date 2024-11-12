# 河北省发改委经济运行平台

## 项目启动

```
yarn dev or npm run dev
```

## 项目打包

```
yarn build or npm run build
```

## css module

```
*.module.css 为开启css module
*.css 为正常模式
```

## git commit 提交规范

```
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```

## 项目结构

```
react-falsework
├─.dockerignore
├─.eslintignore
├─.eslintrc.js
├─.npmrc
├─.prettierrc.json
├─Dockerfile
├─README.md
├─babel.config.json
├─docker.sh
├─index.html
├─nginx.conf
├─package.json
├─pnpm-lock.yaml
├─postcss.config.js
├─tsconfig.json
├─vite.config.mjs
├─webpack
|    ├─webpack.base.js
|    ├─webpack.dev.js
|    └webpack.prod.js
├─types
|   ├─css.d.ts
|   ├─images.d.ts
|   └window.d.ts
├─src
|  ├─index.css
|  ├─index.tsx
|  ├─normalize.css
|  ├─utils
|  |   ├─index.ts
|  |   ├─req.ts
|  |   ├─to.ts
|  |   └user.ts
|  ├─service
|  |    └request.ts
|  ├─routes
|  |   └index.ts
|  ├─pages
|  |   ├─outlet
|  |   |   └index.tsx
|  |   ├─home
|  |   |  ├─index.css
|  |   |  ├─index.module.css
|  |   |  └index.tsx
|  |   ├─a
|  |   | └index.tsx
|  ├─hocs
|  |  └withAuth.tsx
|  ├─components
|  |     ├─route-component
|  |     |        └index.tsx
|  |     ├─layout
|  |     |   ├─index.module.css
|  |     |   └index.tsx
├─public
|   ├─js
|   | └config.js
|   ├─images
|   |   └1.png
├─.husky
|   ├─commit-msg
|   ├─pre-commit
|   ├─_
|   | └husky.sh
```
