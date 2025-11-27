#!/usr/bin/env node

/**
 * 恋爱占有欲测试截图生成脚本
 * 
 * 功能：
 * 1. 启动开发服务器
 * 2. 生成20个不同分数的测试结果截图
 * 3. 保存到screenshots文件夹
 * 
 * 使用方法：
 * npm run screenshot
 * 
 * 安全限制：
 * - 只能在localhost环境运行
 * - 检查hostname确保本地环境
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 生成20个测试分数，包含极值和均匀分布
function generateTestScores() {
  const scores = [
    0,    // 最小值
    100,  // 最大值
  ];
  
  // 添加18个均匀分布的分数 (5, 10, 15, ..., 90, 95)
  for (let i = 1; i <= 18; i++) {
    scores.push(i * 5);
  }
  
  // 打乱顺序（除了前两个极值）
  const extremes = scores.slice(0, 2);
  const others = scores.slice(2);
  
  for (let i = others.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [others[i], others[j]] = [others[j], others[i]];
  }
  
  return [...extremes, ...others].map((score, index) => ({
    score,
    index: index + 1
  }));
}

// 创建screenshots文件夹
const screenshotsDir = path.join(path.dirname(__dirname), 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function generateScreenshots() {
  console.log('🚀 启动截图生成器...\n');
  console.log('💕 将生成20张不同分数的恋爱占有欲测试结果截图\n');
  
  const browser = await puppeteer.launch({
    headless: 'false',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ],
    protocolTimeout: 60000
  });

  // 生成20个测试分数
  const testScores = generateTestScores();
  
  console.log('📋 将生成以下分数的截图:');
  console.log(`   极小值: ${testScores[0].score}分`);
  console.log(`   极大值: ${testScores[1].score}分`);
  console.log(`   其他分数: ${testScores.slice(2).map(s => s.score).join(', ')}分`);
  console.log('');

  try {
    for (const { score, index } of testScores) {
      console.log(`📸 [${index}/20] 正在生成分数 ${score} 的截图...`);
      
      let page;
      try {
        page = await browser.newPage();
        
        // 设置视口大小
        await page.setViewport({
          width: 1200,
          height: 2400,
          deviceScaleFactor: 2 // 高清截图
        });

        // 访问结果页，添加测试模式参数和分数
        const url = `http://localhost:5173/?test=true&score=${score}`;
        await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 30000
        });

        // 等待页面完全加载
        await page.waitForSelector('.result-screen', { timeout: 10000 });
        
        // 额外等待动画完成
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 截图 - 使用分数命名
        const timestamp = Date.now();
        const screenshotPath = path.join(screenshotsDir, `score_${String(score).padStart(3, '0')}_${timestamp}.png`);
        await page.screenshot({
          path: screenshotPath,
          fullPage: true
        });

        console.log(`✅ [${index}/20] 分数 ${score} 截图已保存`);
        
      } catch (error) {
        console.error(`❌ [${index}/20] 分数 ${score} 截图失败:`, error.message);
      } finally {
        if (page) {
          await page.close().catch(() => {});
        }
      }
      
      // 短暂延迟，避免过快
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n🎉 所有截图生成完成！');
    console.log(`📁 截图保存位置: ${screenshotsDir}`);
    console.log('\n📊 分数分布统计:');
    console.log(`   0-20分 (佛系恋爱): ${testScores.filter(s => s.score <= 20).length}张`);
    console.log(`   21-40分 (理性恋爱): ${testScores.filter(s => s.score > 20 && s.score <= 40).length}张`);
    console.log(`   41-60分 (甜蜜占有): ${testScores.filter(s => s.score > 40 && s.score <= 60).length}张`);
    console.log(`   61-80分 (强烈占有): ${testScores.filter(s => s.score > 60 && s.score <= 80).length}张`);
    console.log(`   81-100分 (极度占有): ${testScores.filter(s => s.score > 80).length}张`);
    
  } catch (error) {
    console.error('❌ 生成截图时出错:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// 检查是否在本地环境运行
function isLocalEnvironment() {
  const hostname = os.hostname();
  const networkInterfaces = os.networkInterfaces();
  
  // 检查是否有localhost或127.0.0.1的网络接口
  let hasLocalhost = false;
  for (const [name, interfaces] of Object.entries(networkInterfaces)) {
    if (interfaces) {
      for (const iface of interfaces) {
        if (iface.address === '127.0.0.1' || iface.address === '::1') {
          hasLocalhost = true;
          break;
        }
      }
    }
  }
  
  return hasLocalhost;
}

// 检查开发服务器是否运行
async function checkServer() {
  try {
    const response = await fetch('http://localhost:5173');
    return response.ok;
  } catch {
    return false;
  }
}

// 主函数
async function main() {
  console.log('🔒 安全检查：验证本地环境...');
  
  // 严格检查：必须在本地环境运行
  if (!isLocalEnvironment()) {
    console.error('❌ 安全限制：此脚本只能在本地环境运行！');
    console.error('❌ 检测到非本地环境，已阻止执行。');
    process.exit(1);
  }
  
  console.log('✅ 本地环境验证通过\n');
  
  console.log('🔍 检查开发服务器...');
  
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.error('❌ 开发服务器未运行！');
    console.log('💡 请先运行: npm run dev');
    console.log('💡 然后在另一个终端运行: npm run screenshot');
    process.exit(1);
  }

  console.log('✅ 开发服务器正在运行\n');
  
  await generateScreenshots();
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
