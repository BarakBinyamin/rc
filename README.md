# rc
remote control

```javascript 
{
  "name": "my-app",
  "version": "1.0.0",
  "bin": "index.js",
  "pkg": {
    "assets": [
      "config.json",
      "data/**/*",
      "node_modules/node-pty/build/Debug/pty.node"
    ]
  }
}

const path = require("path");
const fs = require("fs");

// Resolve path correctly when running as an executable
const basePath = process.pkg ? path.dirname(process.execPath) : __dirname;
const configPath = path.join(basePath, "config.json");

// Read file
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
console.log("Config loaded:", config);

const pty = require(path.join(basePath, "node_modules/node-pty/build/Debug/pty.node"));
```