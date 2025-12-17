#!/bin/bash
set -e

# 检查并安装 @alpacahq/alpaca-trade-api（如果不存在）
ALPACA_MODULE_PATH="/usr/local/lib/node_modules/n8n/node_modules/@alpacahq/alpaca-trade-api"
if [ ! -d "$ALPACA_MODULE_PATH" ]; then
    echo "⚠️  @alpacahq/alpaca-trade-api not found, installing..."
    cd /usr/local/lib/node_modules/n8n
    npm install @alpacahq/alpaca-trade-api@^3.0.2 || {
        echo "❌ Failed to install @alpacahq/alpaca-trade-api"
        echo "This may cause custom Alpaca nodes to fail"
    }
else
    echo "✅ @alpacahq/alpaca-trade-api is available"
fi

# 处理 MCP 配置
if [ -f /data/mcp/.env.template ]; then
    echo "Generating Alpaca MCP configuration..."
    envsubst < /data/mcp/.env.template > ~/.env
    # 如果生成了 .env，加载环境变量
    if [ -f ~/.env ]; then
        set -a
        source ~/.env
        set +a
    fi
fi

# 清理函数：当收到退出信号时，清理后台进程
cleanup() {
    echo "Shutting down..."
    if [ ! -z "$MCP_PID" ]; then
        echo "Stopping alpaca-mcp-server (PID: $MCP_PID)..."
        kill $MCP_PID 2>/dev/null || true
        wait $MCP_PID 2>/dev/null || true
    fi
    if [ ! -z "$N8N_PID" ]; then
        echo "Stopping n8n (PID: $N8N_PID)..."
        kill $N8N_PID 2>/dev/null || true
        wait $N8N_PID 2>/dev/null || true
    fi
    exit 0
}

# 设置信号处理
trap cleanup SIGTERM SIGINT

# 启动 alpaca-mcp-server（如果环境变量启用或默认启用）
START_MCP_SERVER="${START_MCP_SERVER:-true}"
if [ "$START_MCP_SERVER" = "true" ] && command -v uvx >/dev/null 2>&1; then
    echo "🚀 Starting alpaca-mcp-server..."
    cd /data/mcp
    # 在后台启动 MCP 服务器
    uvx alpaca-mcp-server serve &
    MCP_PID=$!
    echo "✅ alpaca-mcp-server started (PID: $MCP_PID)"
    
    # 等待一下确保 MCP 服务器启动
    sleep 2
    
    # 检查进程是否还在运行
    if ! kill -0 $MCP_PID 2>/dev/null; then
        echo "⚠️  Warning: alpaca-mcp-server may have failed to start"
    fi
else
    echo "⏭️  Skipping alpaca-mcp-server (START_MCP_SERVER=$START_MCP_SERVER or uvx not found)"
fi

# 执行原始命令（通常是 n8n start）
# 如果命令是 "n8n"，则执行 "n8n start"
if [ "$1" = "n8n" ] && [ -z "$2" ]; then
    shift
    echo "🚀 Starting n8n..."
    # 在前台运行 n8n（使用 exec 替换当前进程，这样容器会保持运行）
    # 这是主进程，容器会等待它退出
    exec n8n start "$@"
else
    # 执行其他命令
    exec "$@"
fi
