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
# No need to manually copy files to standalone directory as Next.js will create it
# Just ensure the required files are in the correct location
cp netlify.toml .next/
cp -r public .next/standalone/

# Ensure the required-server-files.json is in the correct location for Netlify
echo "Ensuring required-server-files.json is in the correct location..."
if [ -f ".next/required-server-files.json" ]; then
  mkdir -p .next/standalone/.next
  cp .next/required-server-files.json .next/standalone/.next/
fi

echo "Build complete. Deploy the .next/standalone directory to Netlify." 