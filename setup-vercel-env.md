# Vercel Environment Variables Setup

## 🚀 Your app is deployed at:
**Production URL**: https://post-project-f4knu8iqh-egzziwd-8640s-projects.vercel.app

## ⚙️ Required Environment Variables

You need to set these environment variables in your Vercel dashboard:

### 1. Go to Vercel Dashboard
- Visit: https://vercel.com/egzziwd-8640s-projects/post-project
- Click on "Settings" tab
- Click on "Environment Variables" in the sidebar

### 2. Add These Variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/socialApp` | MongoDB Atlas connection string |
| `JWT_SECRET` | `your_super_secret_jwt_key_here_make_it_long_and_random_for_security_production` | JWT signing secret (64+ chars) |
| `SESSION_SECRET` | `your_super_secret_session_key_here_make_it_long_and_random_too_production` | Session secret (64+ chars) |
| `SALT_ROUNDS` | `12` | Bcrypt salt rounds |
| `COOKIE_MAX_AGE` | `86400000` | Cookie expiration (24 hours) |
| `COOKIE_SECURE` | `true` | Secure cookies for HTTPS |
| `COOKIE_HTTP_ONLY` | `true` | HTTP-only cookies |

### 3. MongoDB Atlas Setup (if you don't have it):

1. **Create MongoDB Atlas Account**: https://www.mongodb.com/atlas
2. **Create a Cluster**: Choose free tier
3. **Create Database User**: 
   - Username: `socialapp`
   - Password: Generate a strong password
4. **Whitelist IP Addresses**: Add `0.0.0.0/0` (allow all IPs)
5. **Get Connection String**: 
   ```
   mongodb+srv://socialapp:<password>@cluster0.xxxxx.mongodb.net/socialApp?retryWrites=true&w=majority
   ```

### 4. Generate Secure Secrets:

You can generate secure secrets using Node.js:
```javascript
// Run this in Node.js console
require('crypto').randomBytes(64).toString('hex')
```

### 5. After Setting Variables:

1. **Redeploy**: The app will automatically redeploy when you save environment variables
2. **Test**: Visit your production URL and try to sign up/login
3. **Check Logs**: Go to "Functions" tab in Vercel dashboard to see logs

## 🔧 Quick Setup Commands:

If you prefer using Vercel CLI:

```bash
# Set environment variables via CLI
vercel env add NODE_ENV
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add SESSION_SECRET
vercel env add SALT_ROUNDS
vercel env add COOKIE_SECURE
vercel env add COOKIE_HTTP_ONLY
vercel env add COOKIE_MAX_AGE

# Redeploy after setting variables
vercel --prod
```

## 🐛 Troubleshooting:

1. **Database Connection Issues**: 
   - Check MongoDB Atlas IP whitelist
   - Verify connection string format
   - Ensure database user has read/write permissions

2. **Login/Signup Not Working**:
   - Check Vercel function logs
   - Verify all environment variables are set
   - Ensure JWT_SECRET is set correctly

3. **View Logs**:
   - Go to Vercel dashboard → Functions tab
   - Click on any function to see real-time logs

## ✅ Success Indicators:

- ✅ Signup creates new users
- ✅ Login redirects to profile page  
- ✅ Error messages display properly
- ✅ Database connection successful
- ✅ JWT tokens work correctly

Your app should now work perfectly on Vercel! 🎉