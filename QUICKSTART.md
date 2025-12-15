# 快速开始指南

## 1. 安装依赖

```bash
cd n8n-nodes-alpaca
npm install
```

## 2. 构建项目

```bash
npm run build
```

这将生成 `dist` 目录，包含编译后的节点代码。

## 3. 配置 Docker Compose

在你的 `docker-compose.yml` 文件中，添加以下配置：

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    volumes:
      # 挂载构建后的节点
      - ./n8n-nodes-alpaca/dist:/home/node/.n8n/custom
      # 可选：持久化n8n数据
      - n8n_data:/home/node/.n8n
    environment:
      - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom

volumes:
  n8n_data:
```

## 4. 启动 n8n

```bash
docker-compose up -d
```

## 5. 在 n8n 中使用

1. 访问 http://localhost:5678
2. 创建新的工作流
3. 添加节点时，搜索 "Alpaca"
4. 配置 Alpaca API 凭证（API Key ID 和 Secret Key）
5. 选择操作（Get Account, Create Order 等）
6. 配置参数并执行

## 6. 开发模式

如果需要修改节点代码：

```bash
# 监听模式，自动重新编译
npm run dev

# 在另一个终端中重新构建
npm run build

# 然后重启 n8n 容器以加载新代码
docker-compose restart n8n
```

## 常见问题

### TypeScript 错误

如果在开发时看到 TypeScript 错误，这是正常的。这些错误会在安装依赖后自动解决，因为 `n8n-workflow` 包提供了正确的类型定义。

### 节点未显示

- 确保已经运行 `npm run build`
- 确保 `dist` 目录已正确挂载到容器
- 检查 docker-compose.yml 中的路径是否正确
- 重启 n8n 容器

### API 请求失败

- 检查 API 凭证是否正确
- 确认使用的是 Paper Trading 还是 Live Trading 环境
- 查看 n8n 的执行日志以获取详细错误信息

