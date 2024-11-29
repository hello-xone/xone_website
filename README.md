# 部署教程
## 如果代码弄到服务器
1. 执行yarn 安装依赖
2. yarn build打包
3. dist目录的所有文件 移动到 nginx配置的目录 比如 默认是/var/www/html 就执行 sudo cp -r ~/website/dist/* /var/www/html


## 如果代码在本地
1. 本地执行yarn
2. 本地执行 yarn build打包
3. 上传dist目录里面的文件到nginx 执行的目录去就行了


### nginx提示
```
location / {
  try_files $uri $uri/ /index.html;  #一定要配置这一行
}
```



### 不用在意这个，我存命令的
sudo cp -r ~/website/* /var/www/