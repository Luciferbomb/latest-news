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

# The standalone output is already generated in .next/standalone
# No need to manually copy files as Next.js handles this with output: 'standalone'
echo "Build complete. The .next/standalone directory is ready for deployment." 