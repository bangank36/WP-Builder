/**
 * Script to watch for changes in the demo.html file and copy it to the public directory
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chokidar = require('chokidar');

const sourceFile = path.join(__dirname, 'src/browser/demo.html');
const targetDir = path.join(__dirname, 'public/browser-demo');
const targetFile = path.join(targetDir, 'index.html');

// New path for demo-browser
const newTargetDir = path.join(__dirname, 'public/demo-browser');
const newTargetFile = path.join(newTargetDir, 'index.html');

// Create target directories if they don't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

if (!fs.existsSync(newTargetDir)) {
  fs.mkdirSync(newTargetDir, { recursive: true });
}

// Initial copy
copyFile();

// Use chokidar for more reliable file watching
const watcher = chokidar.watch(sourceFile, {
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 300,
    pollInterval: 100
  }
});

console.log(`Watching for changes in ${sourceFile}...`);

watcher.on('change', () => {
  console.log(`${sourceFile} changed, copying to both target locations...`);
  copyFile();
});

function copyFile() {
  try {
    // Read the source file
    const content = fs.readFileSync(sourceFile, 'utf8');

    // Write to the target files
    fs.writeFileSync(targetFile, content, 'utf8');
    fs.writeFileSync(newTargetFile, content, 'utf8');

    console.log(`Demo file copied to ${targetFile} and ${newTargetFile}`);
  } catch (error) {
    console.error('Error copying demo file:', error.message);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  watcher.close();
  console.log('\nStopped watching demo file');
  process.exit(0);
});

process.on('SIGTERM', () => {
  watcher.close();
  console.log('\nStopped watching demo file');
  process.exit(0);
});
