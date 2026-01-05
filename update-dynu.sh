#!/bin/bash
# Dynu IP更新脚本
# 使用方法: ./update-dynu.sh

# 从环境变量或配置文件读取配置
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Dynu配置
DYNU_USERNAME="${DYNU_USERNAME:-}"
DYNU_PASSWORD="${DYNU_PASSWORD:-}"
DYNU_DOMAIN="${DYNU_DOMAIN:-}"

# 检查配置
if [ -z "$DYNU_USERNAME" ] || [ -z "$DYNU_PASSWORD" ] || [ -z "$DYNU_DOMAIN" ]; then
    echo "错误: 请设置 DYNU_USERNAME、DYNU_PASSWORD 和 DYNU_DOMAIN 环境变量"
    echo "或在 .env 文件中配置:"
    echo "  DYNU_USERNAME=your-username"
    echo "  DYNU_PASSWORD=your-password"
    echo "  DYNU_DOMAIN=your-domain.dynu.com"
    exit 1
fi

# 获取当前公共IP
CURRENT_IP=$(curl -s https://api.ipify.org || curl -s https://ifconfig.me || curl -s https://icanhazip.com)

if [ -z "$CURRENT_IP" ]; then
    echo "错误: 无法获取当前IP地址"
    exit 1
fi

# 更新Dynu
echo "正在更新 Dynu: $DYNU_DOMAIN -> $CURRENT_IP"
RESPONSE=$(curl -s "https://api.dynu.com/nic/update?username=$DYNU_USERNAME&password=$DYNU_PASSWORD&hostname=$DYNU_DOMAIN&myip=$CURRENT_IP")

if echo "$RESPONSE" | grep -q "good\|nochg"; then
    echo "✓ Dynu更新成功: $DYNU_DOMAIN -> $CURRENT_IP"
    # 记录更新时间
    echo "$(date): $CURRENT_IP" >> /tmp/dynu-update.log
else
    echo "✗ Dynu更新失败: $RESPONSE"
    exit 1
fi

