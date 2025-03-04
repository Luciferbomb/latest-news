// netlify.js - Netlify specific configuration for Next.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Create a custom server for Netlify
const app = next({ dev: false });
const handle = app.getRequestHandler();

exports.handler = async function(event, context) {
  // For keeping the browser launch
  context.callbackWaitsForEmptyEventLoop = false;
  
  const { path, httpMethod, headers, queryStringParameters, body } = event;
  
  await app.prepare();
  
  const reqUrl = path + (Object.keys(queryStringParameters).length > 0 
    ? '?' + Object.keys(queryStringParameters).map(key => 
        `${key}=${queryStringParameters[key]}`).join('&') 
    : '');
  
  const parsedUrl = parse(reqUrl, true);
  
  return new Promise((resolve, reject) => {
    // Mock request and response
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