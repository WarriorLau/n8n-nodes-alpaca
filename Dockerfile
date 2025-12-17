FROM n8nio/n8n:latest

USER root

# Install necessary system packages
RUN apk add --no-cache \
    curl \
    git \
    build-base \
    chromium \
    bash \
    tar \
    xz \
    util-linux \
    coreutils \
    gettext

# Install Astral uv/uvx and make available system-wide
RUN curl -Ls https://astral.sh/uv/install.sh | bash \
    && cp /root/.local/bin/uv /usr/local/bin/uv \
    && cp /root/.local/bin/uvx /usr/local/bin/uvx \
    && chmod a+rx /usr/local/bin/uv /usr/local/bin/uvx \
    && mkdir -p /data/mcp \
    && chown -R node:node /data/mcp

# 安装 @alpacahq/alpaca-trade-api 到 n8n 的 node_modules
# 确保安装到正确的位置，让 n8n 能够找到它
RUN cd /usr/local/lib/node_modules/n8n && \
    npm install @alpacahq/alpaca-trade-api@^3.0.2 && \
    chown -R node:node /usr/local/lib/node_modules/n8n/node_modules/@alpacahq && \
    echo "✅ @alpacahq/alpaca-trade-api installed successfully"


WORKDIR /data/mcp

COPY --chown=node:node alpaca-mcp-template.env .env.template
RUN chmod 644 .env.template
ENV PATH="/usr/local/bin:/root/.local/bin:${PATH}"
# 复制 docker-entrypoint.sh
# 注意：如果 docker-compose.yml 的 context 是 .（n8n-nodes-alpaca目录），则从当前目录复制
# 如果 context 是父目录，则从 ../docker-entrypoint.sh 复制
COPY --chown=root:root docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER node

# 使用自定义 entrypoint，它会检查依赖并启动 n8n
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
#CMD ["uvx", "alpaca-mcp-server", "serve"]
CMD ["n8n"]