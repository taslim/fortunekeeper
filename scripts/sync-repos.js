
const fs = require('fs');
const path = require('path');

function syncPublicRepo() {
  const publicDir = path.join(__dirname, '../public');
  const privateDir = path.join(__dirname, '../enterprise');
  
  // Sync public-facing changes
  const publicFiles = [
    'components/CookieSVG.js',
    'pages/index.js',
    'styles/globals.css'
  ];
  
  publicFiles.forEach(file => {
    const sourcePath = path.join(privateDir, file);
    const destPath = path.join(publicDir, file);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Synced ${file} to public repo`);
    }
  });
}

module.exports = { syncPublicRepo };
