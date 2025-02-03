
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

console.log(`[${new Date().toISOString()}] Starting server initialization...`);
console.log(`[${new Date().toISOString()}] Environment: ${process.env.NODE_ENV}`);

app.prepare()
  .then(() => {
    console.log(`[${new Date().toISOString()}] Next.js initialization complete`);
    
    const server = createServer((req, res) => {
      console.log(`[${new Date().toISOString()}] Request received: ${req.method} ${req.url}`);
      
      const parsedUrl = parse(req.url, true);
      const startTime = Date.now();
      
      // Add response logging
      const originalEnd = res.end;
      res.end = function(...args) {
        const duration = Date.now() - startTime;
        console.log(`[${new Date().toISOString()}] Response sent: ${res.statusCode} (${duration}ms)`);
        originalEnd.apply(res, args);
      };
      
      handle(req, res, parsedUrl);
    }).listen(3000, '0.0.0.0', (err) => {
      if (err) {
        console.error(`[${new Date().toISOString()}] Server start error:`, err);
        throw err;
      }
      console.log(`[${new Date().toISOString()}] Server listening on port 3000`);
    });

    // Add error handling
    server.on('error', (err) => {
      console.error(`[${new Date().toISOString()}] Server error:`, err);
    });
  })
  .catch((err) => {
    console.error(`[${new Date().toISOString()}] App preparation error:`, err);
    process.exit(1);
  });
