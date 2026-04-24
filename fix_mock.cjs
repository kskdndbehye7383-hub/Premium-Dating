const fs = require('fs');
let content = fs.readFileSync('src/data/mock.ts', 'utf8');
content = content.replace(/,\\n/g, ',\n');
content = content.replace(/\\n\];/g, '\n];');
fs.writeFileSync('src/data/mock.ts', content);
