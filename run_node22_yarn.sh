#!/bin/bash
# run-node22-yarn.sh
# 在 Docker 容器中用 Node 22 跑你的 extends-api 專案 (使用 yarn)

docker run --rm \
  --name extends-api \
  -v "$HOME/Projects/extends-api":/app \
  -w /app \
  -p 3000:3000 \
  -d node:22 \
  bash -lc "corepack enable || true; yarn install && yarn start"
