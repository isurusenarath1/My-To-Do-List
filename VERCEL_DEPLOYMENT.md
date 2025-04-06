# Vercel Deployment Instructions

This document provides step-by-step instructions for deploying the Todo List application to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or other MongoDB provider
3. The Todo List application code

## Setup Steps

### 1. Configure MongoDB Atlas

1. Create a MongoDB Atlas cluster if you don't have one
2. Create a database user with read/write access
3. Add your IP address to the IP Access List (or allow access from anywhere for simplicity)
4. Get your MongoDB connection string from Atlas

### 2. Prepare Your Application

The application has already been configured for Vercel deployment with:
- `vercel.json` - Vercel configuration file
- Environment variables setup
- Server.js export for Vercel serverless functions

### 3. Deploy to Vercel

1. Install Vercel CLI (optional): `npm i -g vercel`
2. Log in to Vercel: `vercel login`
3. Deploy the application:
   - Using CLI: Run `vercel` from the project root
   - Using Vercel dashboard:
     - Push your code to GitHub
     - Import the repository in the Vercel dashboard

### 4. Configure Environment Variables in Vercel

After deploying, set up the following environment variables in the Vercel dashboard:

1. `MONGODB_URI` - Your MongoDB connection string (from Atlas)
2. `NODE_ENV` - Set to "production"
3. `FRONTEND_URL` - Leave empty to allow all origins, or set to your deployed frontend URL

### 5. Redeploy with Environment Variables

If you added environment variables after the first deployment, you'll need to redeploy:
- Using CLI: `vercel --prod`
- In the dashboard: Trigger a new deployment

### 6. Verify Deployment

1. Visit your deployed application URL
2. Check the health endpoint: `https://your-app-url/health`
3. Verify that todos can be created and managed

## Troubleshooting

If you encounter issues with the deployment:

1. **Database Connection Issues**:
   - Check your MongoDB URI is correct in the environment variables
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify the database user has correct permissions

2. **API Not Working**:
   - Check the Vercel Function Logs in the dashboard
   - Verify the API routes are correctly configured in `vercel.json`
   - Test the API endpoints directly

3. **CORS Issues**:
   - Check the CORS configuration in `backend/server.js`
   - Make sure your frontend URL is correctly set in the CORS configuration

## Further Customization

You can customize the deployment by:

1. Adding custom domains in the Vercel dashboard
2. Configuring build settings
3. Setting up serverless functions for specific API routes

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Express.js with Vercel](https://vercel.com/guides/using-express-with-vercel) 