const fs = require('fs');
const path = require('path');

// Create public/browser-demo directory if it doesn't exist
const demoDir = path.join(__dirname, 'public', 'browser-demo');
if (!fs.existsSync(demoDir)) {
  fs.mkdirSync(demoDir, { recursive: true });
}

// Copy demo.html to public/browser-demo
fs.copyFileSync(
  path.join(__dirname, 'src', 'browser', 'demo.html'),
  path.join(demoDir, 'index.html')
);

console.log('Demo file copied to public/browser-demo/index.html');
