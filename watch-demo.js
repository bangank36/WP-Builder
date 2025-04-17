/**
 * Script to watch for changes in the demo.html file and copy it to the public directory
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceFile = path.join(__dirname, 'src/browser/demo.html');
const targetDir = path.join(__dirname, 'public/browser-demo');
const targetFile = path.join(targetDir, 'index.html');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Initial copy
copyFile();

// Watch for changes
console.log(`Watching for changes in ${sourceFile}...`);
fs.watchFile(sourceFile, { interval: 1000 }, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log(`${sourceFile} changed, copying to ${targetFile}...`);
    copyFile();
  }
});

function copyFile() {
  try {
    // Read the source file
    const content = fs.readFileSync(sourceFile, 'utf8');
    
    // Write to the target file
    fs.writeFileSync(targetFile, content, 'utf8');
    
    console.log(`Demo file copied to ${targetFile}`);
  } catch (error) {
    console.error('Error copying demo file:', error.message);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  fs.unwatchFile(sourceFile);
  console.log('\nStopped watching demo file');
  process.exit(0);
});
