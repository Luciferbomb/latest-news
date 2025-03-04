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
JSONBIN_BIN_ID=${JSONBIN_BIN_ID:-'67c34ae2ad19ca34f814aca1'}
JSONBIN_API_KEY=${JSONBIN_API_KEY:-'$2a$10$rtwshaMuYk6Q9LntsiCyL.AoGKxDHXFOyzzHCSXR80bNzQWd0LDfC'}
VOICE_ASSISTANT_ALLOWED_TOPICS=${VOICE_ASSISTANT_ALLOWED_TOPICS:-'technology,ai,programming,computers'}
VOICE_ASSISTANT_ENABLED=${VOICE_ASSISTANT_ENABLED:-'true'}
EOF

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the Next.js application
echo "Building the Next.js application..."
npm run build

# Create a 404.html page for fallback
echo "Creating 404.html page..."
cat > out/404.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found | AI News</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
      color: #333;
      background-color: #f9f9f9;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
      max-width: 600px;
      margin-bottom: 2rem;
    }
    a {
      color: #0070f3;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>404 - Page Not Found</h1>
  <p>The page you're looking for doesn't exist or has been moved.</p>
  <a href="/">Go back to homepage</a>
</body>
</html>
EOF

echo "Build complete. The out directory is ready for deployment." 