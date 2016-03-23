Getting Started

$ npm install 

$ npm link

＃生成新的活动

actinit -n (活动名字) -m (single/multi)

其中：single 表示单页模式/ multi表示多个html

＃启动服务

打开Gruntfile.js文件，找到config配置，把actName改成要部署的活动名，然后输入grunt serve 

#发布
grunt build

＃部署发布后的工程
grunt serve:dist
