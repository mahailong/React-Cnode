## dva-antd-draft-cnodeAPI
[预览DEMO](https://mahailong.github.io/React-Cnode/dist) 
 
 
### 项目简介
 
这是一个基于react技术栈的WebApp版cnode客户端

- 项目采用[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)作为架构
- UI组件选用的是[ant design移动版](https://mobile.ant.design/index-cn)
- 发布话题及评论话题所用编辑器用的是基于draft.js的react-draft-wysiwyg
- api来自[cnodejs论坛](https://cnodejs.org/)官方
 
 感谢以上项目作者的贡献


## 页面
- home:首页列表，加入侧边栏及上拉加载功能。
- article:主题详情，登陆后能够收藏，评论和点赞。
- message:消息提醒，能查看消息详情和清空所有未读消息
- user:个人主页，包括最近参与，回复，以及收藏的主题
- publish:发表主题，react-draft-wysiwyg作为编辑器，发布成功后能跳转到相应主题页面
- about:关于页面，APP介绍
- login:登录页面，登录后会把accesstoken存于localStore


## 运行项目
```
  git clone https://github.com/mahailong/cnode-antd.git
  cd cnode-antd
  npm install
  npm start
```


## 生产项目
```
  npm run build(项目生成在./dist)
```


## TODO
- 首页列表进入其他页面返回时回到之前的位置
- 优化页面性能

