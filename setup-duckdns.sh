#!/bin/bash
# DuckDNS + Traefik 自动化设置脚本
# 用于在AWS EC2上快速部署n8n with HTTPS

set -e

echo "=========================================="
echo "  DuckDNS + Traefik 自动化设置"
echo "=========================================="
echo ""

# 检查是否在正确的目录
if [ ! -f "docker-compose.yml" ]; then
    echo "错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 步骤1: 检查Docker和Docker Compose
echo "[1/6] 检查Docker环境..."
if ! command -v docker &> /dev/null; then
    echo "错误: 未安装Docker，请先安装Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "错误: 未安装Docker Compose，请先安装Docker Compose"
    exit 1
fi

echo "✓ Docker环境检查通过"
echo ""

# 步骤2: 创建必要的目录
echo "[2/6] 创建必要的目录..."
mkdir -p traefik/letsencrypt
echo "✓ 目录创建完成"
echo ""

# 步骤3: 创建acme.json文件
echo "[3/6] 创建Let's Encrypt证书存储文件..."
if [ ! -f "traefik/letsencrypt/acme.json" ]; then
    touch traefik/letsencrypt/acme.json
    chmod 600 traefik/letsencrypt/acme.json
    echo "✓ acme.json文件创建完成"
else
    echo "✓ acme.json文件已存在"
fi
echo ""

# 步骤4: 检查Docker网络
echo "[4/6] 检查Docker网络..."
if ! docker network ls | grep -q n8n_network; then
    echo "创建n8n_network网络..."
    docker network create n8n_network
    echo "✓ 网络创建完成"
else
    echo "✓ 网络已存在"
fi
echo ""

# 步骤5: 配置.env文件
echo "[5/6] 配置环境变量文件..."
if [ ! -f ".env" ]; then
    echo "创建.env文件..."
    cp .env.example .env
    
    # 获取EC2公共IP
    echo "获取EC2公共IP..."
    EC2_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || echo "")
    
    if [ -n "$EC2_IP" ]; then
        echo "检测到EC2 IP: $EC2_IP"
    fi
    
    echo ""
    echo "=========================================="
    echo "  需要配置以下信息:"
    echo "=========================================="
    echo ""
    echo "1. DuckDNS Token:"
    echo "   - 访问 https://www.duckdns.org"
    echo "   - 登录后，在控制台可以看到你的Token"
    echo "   - 在.env文件中设置: DUCKDNS_TOKEN=your-token"
    echo ""
    echo "2. DuckDNS域名:"
    echo "   - 在DuckDNS控制台创建子域名（如: my-n8n-test）"
    echo "   - 完整域名格式: yourname.duckdns.org"
    echo "   - 在.env文件中设置: DUCKDNS_DOMAIN=yourname.duckdns.org"
    echo "   - 同时设置: N8N_DOMAIN=yourname.duckdns.org"
    echo ""
    echo "3. Let's Encrypt邮箱:"
    echo "   - 用于SSL证书通知"
    echo "   - 在.env文件中设置: LETSENCRYPT_EMAIL=your-email@example.com"
    echo ""
    echo "4. N8N基础认证密码:"
    echo "   - 修改.env文件中的: N8N_BASIC_AUTH_PASSWORD"
    echo ""
    echo "=========================================="
    echo ""
    read -p "按Enter键继续编辑.env文件，或按Ctrl+C退出..."
    
    # 尝试使用默认编辑器
    ${EDITOR:-nano} .env 2>/dev/null || vi .env 2>/dev/null || echo "请手动编辑 .env 文件"
else
    echo "✓ .env文件已存在，跳过创建"
fi
echo ""

# 步骤6: 设置DuckDNS自动更新
echo "[6/6] 设置DuckDNS自动更新..."
if [ -f "update-duckdns.sh" ]; then
    chmod +x update-duckdns.sh
    
    # 检查crontab是否已存在
    if ! crontab -l 2>/dev/null | grep -q "update-duckdns.sh"; then
        SCRIPT_PATH=$(pwd)/update-duckdns.sh
        (crontab -l 2>/dev/null; echo "*/5 * * * * $SCRIPT_PATH >> /tmp/duckdns-cron.log 2>&1") | crontab -
        echo "✓ 已添加DuckDNS自动更新到crontab（每5分钟更新一次）"
    else
        echo "✓ DuckDNS自动更新已配置"
    fi
    
    # 立即执行一次更新
    echo "执行首次DuckDNS更新..."
    ./update-duckdns.sh || echo "警告: DuckDNS更新失败，请检查配置"
else
    echo "警告: update-duckdns.sh文件不存在"
fi
echo ""

# 完成
echo "=========================================="
echo "  设置完成！"
echo "=========================================="
echo ""
echo "下一步操作:"
echo ""
echo "1. 确保已编辑 .env 文件并配置了以下内容:"
echo "   - DUCKDNS_TOKEN"
echo "   - DUCKDNS_DOMAIN"
echo "   - N8N_DOMAIN (与DUCKDNS_DOMAIN相同)"
echo "   - LETSENCRYPT_EMAIL"
echo "   - N8N_BASIC_AUTH_PASSWORD"
echo ""
echo "2. 确保AWS EC2安全组已开放以下端口:"
echo "   - 80 (HTTP)"
echo "   - 443 (HTTPS)"
echo ""
echo "3. 启动服务:"
echo "   docker-compose up -d"
echo ""
echo "4. 查看日志:"
echo "   docker-compose logs -f traefik"
echo "   docker-compose logs -f n8n"
echo ""
echo "5. 访问服务:"
echo "   https://你的域名.duckdns.org"
echo ""
echo "6. 查看Traefik Dashboard (调试用):"
echo "   http://你的域名.duckdns.org:8080"
echo ""
echo "注意: Let's Encrypt证书首次生成可能需要几分钟"
echo "=========================================="

