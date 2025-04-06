# Deploying To-Do List App to Vercel

This guide provides step-by-step instructions for deploying the To-Do List application to Vercel, including both the frontend React application and the backend Express API using serverless functions.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or other MongoDB host)
3. The To-Do List application code from this repository

## Setup Steps

### 1. Configure MongoDB Atlas

1. Create a MongoDB Atlas account or log in to your existing account
2. Create a new cluster (the free tier is sufficient for most cases)
3. Create a database user with read/write permissions
4. Add your IP address to the IP Whitelist (or allow access from anywhere for testing)
5. Obtain your MongoDB connection string, which will look something like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
   ```

### 2. Preparing the Application

The application is already configured to work with Vercel through:

- Serverless functions in the `/api` directory that handle API requests
- Proper directory structure for Vercel deployment
- A `vercel.json` configuration file that routes requests correctly

### 3. Deploying to Vercel

1. Push your code to a GitHub repository
2. Create an account on Vercel if you don't have one
3. From the Vercel dashboard, click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset**: Select "Other" (the vercel.json file will handle the configuration)
   - **Build Command**: Already configured in package.json as `npm run build`
   - **Output Directory**: Already configured in vercel.json as `dist`

### 4. Setting Environment Variables

1. On the Vercel project settings page, go to the "Environment Variables" section
2. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: Set to `production`

### 5. Deploy

1. Click "Deploy" to initiate the deployment process
2. Vercel will build and deploy your application
3. Once deployment is complete, Vercel will provide you with a URL for your application

### 6. Verify the Deployment

1. Visit the provided URL to check if your frontend is working
2. Test the API by making requests to endpoints like:
   - Health check: `https://your-vercel-url.vercel.app/health`
   - Todos API: `https://your-vercel-url.vercel.app/api/todos`

## How It Works

The deployment setup uses:

1. **Frontend**: Static files served from the `dist` directory, built using Vite
2. **Backend API**: Serverless functions in the `/api` directory
   - `api/todos.js`: Handles all todo-related API requests
   - `api/health.js`: Provides a health check endpoint
   - `api/index.js`: Root API handler

The `vercel.json` configuration file routes requests to the appropriate handlers:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/*.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/todos(.*)",
      "dest": "/api/todos.js"
    },
    {
      "src": "/health",
      "dest": "/api/health.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1",
      "continue": true
    },
    {
      "src": "/(.*)",
      "dest": "/dist/index.html"
    }
  ]
}
```

## Troubleshooting

### API Not Working

If the frontend loads but API requests fail:

1. Check the Network tab in your browser's developer tools to see the specific error
2. Verify that the MongoDB URI is correctly set in Vercel's environment variables
3. Visit `/health` to check the API health status and database connection

### Database Connection Issues

If you see database connection errors:

1. Verify your MongoDB Atlas connection string
2. Ensure your IP is whitelisted in MongoDB Atlas (or set to allow access from anywhere)
3. Check MongoDB Atlas logs for connection attempts

### Frontend Routing Issues

If routes like `/active` or `/history` return a 404:

1. Check that the catch-all route in `vercel.json` is properly configured
2. Make sure you're using client-side routing (React Router) correctly

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Deploying Express.js to Vercel](https://vercel.com/guides/using-express-with-vercel)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/) 