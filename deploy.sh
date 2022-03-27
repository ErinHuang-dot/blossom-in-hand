#!/usr/bin/env sh

# 發生錯誤時中止脚本
set -e

# 打包編譯
npm run build

# cd 到构建输出的目录下
cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:ErinHuang-dot/blossom-in-hand.git master:gh-pages

cd -