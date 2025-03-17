#!/bin/bash

# Install dependencies
npm install

# Build Next.js app
npm run build

# Create necessary directories
mkdir -p .next/standalone/.next/static
mkdir -p .next/standalone/public

# Copy necessary files
cp -r .next/static/* .next/standalone/.next/static/
cp -r public/* .next/standalone/public/
cp package.json .next/standalone/

# Copy static files to public directory
cp -r .next/standalone/.next/static/* .next/standalone/public/_next/static/

# Create netlify.toml in the standalone directory
cat > .next/standalone/netlify.toml << EOL
[build]
  command = "npm run build"
  publish = ".next/standalone"
  functions = "netlify/functions"

[build.environment]
  NEXT_USE_NETLIFY_EDGE = "true"
  NEXT_PRIVATE_TARGET = "server"
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"

# Handle all static assets
[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self' newshubai.tech *.newshubai.tech; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"

# Handle static files
[[redirects]]
  from = "/_next/static/*"
  to = "/public/_next/static/:splat"
  status = 200

# Handle API routes
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/nextjs-server/api/:splat"
  status = 200
  force = true

# Handle Next.js pages and static files
[[redirects]]
  from = "/_next/*"
  to = "/_next/:splat"
  status = 200
  force = true

# Handle all other routes - This should be last
[[redirects]]
  from = "/*"
  to = "/.netlify/functions/nextjs-server"
  status = 200
  force = true
EOL 