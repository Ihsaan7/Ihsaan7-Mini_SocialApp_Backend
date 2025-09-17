# Vercel Deployment Guide

## Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Create a Vercel account at https://vercel.com
3. Set up a MongoDB Atlas database (for production)

## Deployment Steps

### 1. Login to Vercel
```bash
vercel login
```

### 2. Deploy the Project
```bash
vercel
```

### 3. Set Environment Variables
After deployment, set these environment variables in Vercel dashboard:

- `NODE_ENV`: production
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secure random 64-character string
- `SESSION_SECRET`: A secure random 64-character string
- `SALT_ROUNDS`: 12
- `UPLOAD_DIR`: public/images/uploads
- `COOKIE_MAX_AGE`: 86400000
- `COOKIE_SECURE`: true
- `COOKIE_HTTP_ONLY`: true
- `RATE_LIMIT_WINDOW_MS`: 900000
- `RATE_LIMIT_MAX_REQUESTS`: 100

### 4. Configure MongoDB Atlas
1. Create a MongoDB Atlas cluster
2. Add your Vercel deployment IP to the whitelist (or use 0.0.0.0/0 for all IPs)
3. Create a database user with read/write permissions
4. Get the connection string and add it to MONGODB_URI

### 5. Deploy Production Version
```bash
vercel --prod
```

## Important Notes
- File uploads will be stored in Vercel's temporary filesystem
- For persistent file storage, consider using Cloudinary or AWS S3
- The app will automatically restart on each deployment
- Environment variables are securely stored in Vercel

## Troubleshooting
- Check Vercel function logs for errors
- Ensure all environment variables are set correctly
- Verify MongoDB connection string format
- Check that all dependencies are in package.json