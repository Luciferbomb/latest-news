#!/bin/bash

# Create a .env.local file with our API keys
echo "Creating environment variables..."
cat > .env.local << EOF
# API Keys
YOUTUBE_API_KEY=AIzaSyCmsFreWdDFd0nAb3cG8lPCSCWrQBgrB_s
NEWS_API_KEY=0a3970c61b3346f28a0cfa28d0be700a
OPENAI_API_KEY=${OPENAI_API_KEY:-''}
NEWSCATCHER_API_KEY=${NEWSCATCHER_API_KEY:-''}
SERPAPI_API_KEY=${SERPAPI_API_KEY:-''}
EOF

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the Next.js application
echo "Building the Next.js application..."
npm run build

# Prepare the publish directory for Netlify
echo "Preparing the publish directory for Netlify..."
# Create the publish directory if it doesn't exist
mkdir -p .next/publish

# Copy the standalone output to the publish directory
if [ -d ".next/standalone" ]; then
  cp -r .next/standalone/* .next/publish/
  
  # Copy static assets
  mkdir -p .next/publish/.next/static
  cp -r .next/static .next/publish/.next/
fi

# Copy public directory
cp -r public/* .next/publish/

# Ensure the required-server-files.json is in the correct location
if [ -f ".next/required-server-files.json" ]; then
  mkdir -p .next/publish/.next
  cp .next/required-server-files.json .next/publish/.next/
fi

# Copy other necessary files
cp netlify.toml .next/publish/
cp next.config.js .next/publish/
cp package.json .next/publish/
cp server.js .next/publish/
cp netlify.js .next/publish/

# Create a Netlify-specific package.json if needed
cat > .next/publish/package.json << EOF
{
  "name": "ai-news-pwa",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "start": "NODE_ENV=production node server.js"
  },
  "dependencies": {
    "next": "15.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
EOF

# Create Netlify functions directory
mkdir -p .next/publish/netlify/functions
cat > .next/publish/netlify/functions/next-server.js << EOF
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const app = next({ dev: false });
const handle = app.getRequestHandler();

exports.handler = async function(event, context) {
  const { path, httpMethod, headers, queryStringParameters, body } = event;
  
  await app.prepare();
  
  const reqUrl = path + (Object.keys(queryStringParameters || {}).length > 0 
    ? '?' + Object.keys(queryStringParameters || {}).map(key => 
        \`\${key}=\${queryStringParameters[key]}\`).join('&') 
    : '');
  
  const parsedUrl = parse(reqUrl, true);
  
  return new Promise((resolve, reject) => {
    const req = {
      url: reqUrl,
      headers,
      method: httpMethod,
      body: body ? JSON.parse(body) : undefined,
    };
    
    const res = {
      statusCode: 200,
      headers: {},
      body: '',
      setHeader: (name, value) => {
        res.headers[name.toLowerCase()] = value;
      },
      write: (chunk) => {
        res.body += chunk;
      },
      end: (chunk) => {
        if (chunk) res.body += chunk;
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: res.body,
        });
      },
      writeHead: (status, headers) => {
        res.statusCode = status;
        if (headers) res.headers = { ...res.headers, ...headers };
      },
    };
    
    handle(req, res, parsedUrl)
      .catch(error => {
        console.error('Error handling request:', error);
        reject(error);
      });
  });
};
EOF

echo "Build complete. Files prepared for Netlify deployment." 