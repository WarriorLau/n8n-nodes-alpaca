#!/bin/bash
# DuckDNS IP更新脚本
# 使用方法: ./update-duckdns.sh

# 从环境变量或配置文件读取配置
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# DuckDNS配置
DUCKDNS_TOKEN="${DUCKDNS_TOKEN:-}"
DUCKDNS_DOMAIN="${DUCKDNS_DOMAIN:-}"

# 检查配置
if [ -z "$DUCKDNS_TOKEN" ] || [ -z "$DUCKDNS_DOMAIN" ]; then
    echo "错误: 请设置 DUCKDNS_TOKEN 和 DUCKDNS_DOMAIN 环境变量"
    echo "或在 .env 文件中配置:"
    echo "  DUCKDNS_TOKEN=your-token"
    echo "  DUCKDNS_DOMAIN=your-domain.duckdns.org"
    exit 1
fi

# 获取当前公共IP
CURRENT_IP=$(curl -s https://api.ipify.org || curl -s https://ifconfig.me || curl -s https://icanhazip.com)

if [ -z "$CURRENT_IP" ]; then
    echo "错误: 无法获取当前IP地址"
    exit 1
fi

# 更新DuckDNS
echo "正在更新 DuckDNS: $DUCKDNS_DOMAIN -> $CURRENT_IP"
RESPONSE=$(curl -s "https://www.duckdns.org/update?domains=$DUCKDNS_DOMAIN&token=$DUCKDNS_TOKEN&ip=$CURRENT_IP")

if [ "$RESPONSE" = "OK" ]; then
    echo "✓ DuckDNS更新成功: $DUCKDNS_DOMAIN -> $CURRENT_IP"
    # 记录更新时间
    echo "$(date): $CURRENT_IP" >> /tmp/duckdns-update.log
else
    echo "✗ DuckDNS更新失败: $RESPONSE"
    exit 1
fi

