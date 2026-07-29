# gkgy·孪生日志

这是 [gkgy.github.io](https://gkgy.github.io/) 的内容仓库。博客用于发布 AI、工程现场、软件工具与生活实践记录。

## 发布新文章

1. 在 `_posts` 文件夹新建 Markdown 文件。
2. 文件名使用 `YYYY-MM-DD-文章标题.md`。
3. 复制 `drafts/文章模板.md` 的格式并填写正文。
4. 提交到 `master` 分支。GitHub Pages 会自动更新网站。

也可以直接打开博客底部的“发布文章”页面，使用浏览器完成整个过程。

## 本地预览

```bash
bundle install
bundle exec jekyll serve
```

然后访问 `http://127.0.0.1:4000`。

## 设计

博客使用 GitHub Pages 原生支持的 Jekyll，保留轻量、长文优先、归档、搜索、标签、深色模式和移动端阅读体验。
