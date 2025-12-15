# n8n-nodes-alpaca

n8n community node for Alpaca Markets API integration.

## Features

This node provides integration with Alpaca Markets API, allowing you to:

- **Account Management**: Get account information
- **Position Management**: View all open positions
- **Order Management**: Create, view, and cancel orders
- **Market Data**: Get historical bars, latest bars, trades, and quotes
- **Multiple Environments**: Support for both Paper Trading and Live Trading

## Operations

### Account Operations
- **Get Account**: Retrieve account information including buying power, cash, portfolio value, etc.

### Position Operations
- **Get Positions**: Get all open positions in your account

### Order Operations
- **Get Orders**: Retrieve orders (all, open, or closed)
- **Create Order**: Create new market, limit, stop, or stop-limit orders
- **Cancel Order**: Cancel an existing order by order ID

### Market Data Operations
- **Get Bars**: Get historical bar/candlestick data for a symbol
- **Get Latest Bar**: Get the latest bar data for one or more symbols
- **Get Trades**: Get recent trade data
- **Get Quotes**: Get recent quote data

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the node:
```bash
npm run build
```

3. The `dist` folder will contain the compiled node files.

## Docker Compose Integration

To use this node with n8n via docker-compose, mount the `dist` directory:

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
      # Mount the built dist directory
      - ./n8n-nodes-alpaca/dist:/home/node/.n8n/custom
      # Optional: persist n8n data
      - n8n_data:/home/node/.n8n
    environment:
      - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom

volumes:
  n8n_data:
```

**重要提示**：
- 确保先运行 `npm run build` 构建项目，生成 `dist` 目录
- `dist` 目录包含编译后的节点代码
- 重启 n8n 容器后，自定义节点会自动加载

## Configuration

### Credentials

You need to configure Alpaca API credentials:

1. **API Key ID**: Your Alpaca API Key ID
2. **API Secret Key**: Your Alpaca API Secret Key
3. **Environment**: Choose between Paper Trading or Live Trading
4. **Base URL** (optional): Override the default base URL

### Getting Alpaca API Credentials

1. Sign up at [Alpaca Markets](https://alpaca.markets/)
2. Go to your dashboard
3. Navigate to API Keys section
4. Generate your API Key ID and Secret Key
5. For paper trading, use the paper trading credentials

## Development

```bash
# Build for production
npm run build

# Watch mode for development
npm run dev

# Lint code
npm run lint

# Format code
npm run format
```

## License

MIT

