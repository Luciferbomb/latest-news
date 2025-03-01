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

# Copy additional files needed for Netlify
echo "Copying files for Netlify deployment..."
mkdir -p .next/standalone
cp -r .next/* .next/standalone/
cp netlify.toml .next/standalone/
cp next.config.js .next/standalone/
cp -r public .next/standalone/
cp package.json .next/standalone/

echo "Build complete. Deploy the .next/standalone directory to Netlify." 