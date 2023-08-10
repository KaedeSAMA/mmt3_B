# mmt 3.0

## 项目进度

20230409: 完成项目初始化

20230417: 完成了 axios 的二次封装

20230426: 完成了 vite 自动化导入配置以及登录页面 UI

## 注意事项

项目中实现了 element-icon 的自动导入,在使用图标时, 组件名称应为 <i-ep-小写的组件名>

## git 规范

### commit message 格式

eg: `git commit -m "feat: 新增了xxx功能"`

```md
- feat: 新功能、新特性
- fix: 修改 bug
- perf: 更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）
- refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改（例如分号修改）
- test: 测试用例新增、修改
- build: 影响项目构建或依赖项修改
- revert: 恢复上一次提交
- ci: 持续集成相关文件修改
- chore: 其他修改（不在上述类型中的修改）
- release: 发布新版本
- workflow: 工作流相关文件修改
```

### commit emoji

详见链接：[git-emoji 指南](https://gitmoji.js.org/)
