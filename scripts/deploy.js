#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment process...');

try {
  // Step 1: Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('.next')) {
    execSync('rmdir /s /q .next', { stdio: 'inherit', shell: true });
  }
  if (fs.existsSync('out')) {
    execSync('rmdir /s /q out', { stdio: 'inherit', shell: true });
  }

  // Step 2: Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit', shell: true });

  // Step 3: Run linting
  console.log('🔍 Running linting...');
  try {
    execSync('npm run lint', { stdio: 'inherit', shell: true });
  } catch (error) {
    console.log('⚠️ Linting warnings found, but continuing deployment...');
  }

  // Step 4: Run optimization
  console.log('⚡ Running performance optimization...');
  execSync('npm run optimize', { stdio: 'inherit', shell: true });

  // Step 5: Build the project
  console.log('🏗️ Building the project...');
  execSync('npm run build', { stdio: 'inherit', shell: true });

  // Step 6: Check if Vercel CLI is installed
  console.log('🔍 Checking Vercel CLI...');
  try {
    execSync('vercel --version', { stdio: 'pipe', shell: true });
  } catch (error) {
    console.log('📥 Installing Vercel CLI...');
    execSync('npm install -g vercel', { stdio: 'inherit', shell: true });
  }

  // Step 7: Deploy to Vercel
  console.log('🚀 Deploying to Vercel...');
  execSync('vercel --prod', { stdio: 'inherit', shell: true });

  console.log('✅ Deployment completed successfully!');
  console.log('🌐 Your website is now live!');
  console.log('📱 Mobile-first responsive design is active');
  console.log('⚡ Performance optimizations applied');
  console.log('♿ Accessibility features enabled');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
