const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

// 确保 dist 目录存在
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 打包 Alpaca 节点
async function bundleAlpacaNode() {
  const entryPoint = path.join(__dirname, '..', 'dist', 'nodes', 'Alpaca', 'Alpaca.node.js');
  const tempFile = path.join(__dirname, '..', 'dist', 'nodes', 'Alpaca', 'Alpaca.node.temp.js');
  const outfile = path.join(__dirname, '..', 'dist', 'nodes', 'Alpaca', 'Alpaca.node.js');

  if (!fs.existsSync(entryPoint)) {
    console.error(`❌ Entry point not found: ${entryPoint}`);
    console.error('Please run "tsc" first to compile TypeScript files.');
    process.exit(1);
  }

  console.log('📦 Bundling Alpaca node with dependencies...');

  try {
    // 先打包到临时文件
    await esbuild.build({
      entryPoints: [entryPoint],
      bundle: true,
      outfile: tempFile,
      platform: 'node',
      target: 'node18',
      format: 'cjs',
      // 排除 n8n-workflow，因为它在运行时由 n8n 提供
      external: ['n8n-workflow'],
      minify: false, // 保持可读性，方便调试
      sourcemap: false,
      allowOverwrite: true,
    });

    // 替换原文件
    fs.renameSync(tempFile, outfile);
    console.log('✅ Alpaca node bundled successfully');
  } catch (error) {
    // 清理临时文件
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
    console.error('❌ Bundling failed:', error);
    process.exit(1);
  }
}

// 打包凭证文件（通常不需要打包依赖，但为了保持一致性）
async function bundleCredentials() {
  const entryPoint = path.join(__dirname, '..', 'dist', 'credentials', 'AlpacaApi.credentials.js');
  const tempFile = path.join(__dirname, '..', 'dist', 'credentials', 'AlpacaApi.credentials.temp.js');
  const outfile = path.join(__dirname, '..', 'dist', 'credentials', 'AlpacaApi.credentials.js');

  if (!fs.existsSync(entryPoint)) {
    return; // 凭证文件可能不需要打包
  }

  try {
    await esbuild.build({
      entryPoints: [entryPoint],
      bundle: true,
      outfile: tempFile,
      platform: 'node',
      target: 'node18',
      format: 'cjs',
      external: ['n8n-workflow'],
      minify: false,
      sourcemap: false,
      allowOverwrite: true,
    });

    // 替换原文件
    fs.renameSync(tempFile, outfile);
    console.log('✅ Credentials bundled successfully');
  } catch (error) {
    // 清理临时文件
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
    console.warn('⚠️  Credentials bundling failed (may be OK):', error.message);
  }
}

// 主函数
async function main() {
  await bundleAlpacaNode();
  await bundleCredentials();
  console.log('🎉 All bundling completed!');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

