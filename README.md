# 手机html5项目例子
基于create-react-app+ant-design-mobile

app中定义路由

npm start
npm run build


## nginx设置
当找不到静态资源就走反向代理，到index.html 文件
location / {
    try_files $url @be; 
}

location @be{=
    proxy_pass http://host; 
}