import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

function localPath(url) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(url, 'http://127.0.0.1').pathname);
  } catch {
    return null;
  }
  const nextAsset = pathname.match(/^\/_next\/static\/immutable\/(chunks|media)\/([^/]+)$/);
  const relativePath = nextAsset
    ? `${nextAsset[1] === 'chunks' ? 'js' : 'fonts'}/${nextAsset[2]}`
    : pathname === '/' ? 'index.html' : pathname.slice(1);
  const path = resolve(root, relativePath);
  if (path !== root && !path.startsWith(`${root}${sep}`)) return null;
  return path;
}

const server = createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  const path = localPath(request.url ?? '/');
  if (!path || !existsSync(path) || !statSync(path).isFile()) {
    response.writeHead(404).end('Not found');
    return;
  }

  response.writeHead(200, {
    'Cache-Control': 'no-store',
    'Content-Type': contentTypes[extname(path).toLowerCase()] ?? 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
  });
  if (request.method === 'HEAD') response.end();
  else if (extname(path).toLowerCase() === '.html') {
    const html = readFileSync(path, 'utf8')
      .replace(/<script\b[^>]*\bsrc=(?:"[^"]*"|'[^']*')[^>]*>\s*<\/script\s*>/gi, '')
      .replace(/<link\b(?=[^>]*href=["']\/_next\/static\/immutable\/)[^>]*>/gi, '')
      .replace('</body>', '<script defer src="/interactions.js"></script></body>');
    response.end(html);
  }
  else createReadStream(path).pipe(response);
});

server.listen(4173, '127.0.0.1', () => {
  console.log('Invitation available at http://127.0.0.1:4173/');
});
