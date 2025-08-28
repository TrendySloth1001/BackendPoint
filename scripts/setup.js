#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Community Q&A Backend...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from template...');
  const envExamplePath = path.join(__dirname, '..', 'env.example');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created successfully');
    console.log('⚠️  Please update the .env file with your configuration values\n');
  } else {
    console.log('❌ env.example file not found');
    process.exit(1);
  }
} else {
  console.log('✅ .env file already exists\n');
}

// Create necessary directories
const directories = [
  'uploads',
  'uploads/avatars',
  'uploads/spaces/icons',
  'uploads/spaces/banners',
  'uploads/posts',
  'logs',
  'src/database/migrations',
  'src/database/seeders'
];

console.log('📁 Creating necessary directories...');
directories.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created ${dir}`);
  } else {
    console.log(`✅ ${dir} already exists`);
  }
});

// Create .gitkeep files in empty directories
const gitkeepDirs = [
  'uploads/avatars',
  'uploads/spaces/icons',
  'uploads/spaces/banners',
  'uploads/posts',
  'src/database/migrations',
  'src/database/seeders'
];

gitkeepDirs.forEach(dir => {
  const gitkeepPath = path.join(__dirname, '..', dir, '.gitkeep');
  if (!fs.existsSync(gitkeepPath)) {
    fs.writeFileSync(gitkeepPath, '');
  }
});

console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully\n');
} catch (error) {
  console.log('❌ Failed to install dependencies');
  console.log('Please run "npm install" manually\n');
}

console.log('🎉 Setup completed successfully!\n');
console.log('Next steps:');
console.log('1. Update the .env file with your configuration');
console.log('2. Start MongoDB (or use Docker: docker-compose up -d)');
console.log('3. Run the development server: npm run dev');
console.log('4. Access the API at: http://localhost:3000/api/v1');
console.log('5. Check the health endpoint: http://localhost:3000/health\n');

console.log('📚 For more information, check the README.md file');
