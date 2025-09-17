


          
# 📱 Social Media Web Application

> A modern, full-stack social media platform built with Node.js, Express, and MongoDB

https://mini-social-app-seven.vercel.app/

## ✨ Features

- 🔐 **User Authentication** - Secure signup/login with JWT tokens and bcrypt password hashing
- 👤 **User Profiles** - Personalized profiles with profile picture uploads
- 📝 **Post Creation** - Create and share posts with the community
- ❤️ **Social Interactions** - Like and engage with other users' posts
- ✏️ **Content Management** - Edit your own posts
- 🌙 **Dark/Light Theme** - Toggle between themes for better user experience
- 📱 **Responsive Design** - Sharp, bold, and sleek UI that works on all devices
- 🔒 **Secure File Uploads** - Safe image uploading with Multer

## 🛠️ Tech Stack

### Backend
- 🟢 **Node.js** - Runtime environment
- ⚡ **Express.js** - Web application framework
- 🍃 **MongoDB** - NoSQL database
- 🔑 **JWT** - Authentication tokens
- 🔐 **bcrypt** - Password hashing
- 📁 **Multer** - File upload handling
- ✅ **Express Validator** - Input validation

### Frontend
- 🎨 **EJS** - Templating engine
- 💅 **Custom CSS** - Modern styling with CSS variables
- ⚡ **Vanilla JavaScript** - Interactive UI components
- 🎯 **Responsive Design** - Mobile-first approach

### Security & Environment
- 🔒 **Environment Variables** - Secure configuration management
- 🍪 **Secure Cookies** - HTTP-only cookie settings
- 🛡️ **Input Validation** - Server-side validation
- 🔐 **Password Security** - Salted and hashed passwords

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd lec21

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the application
npm start
```

### Environment Variables

Create a `.env` file with the following variables:

```env
NODE_ENV=production
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017/uploadProject
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
SALT_ROUNDS=12
UPLOAD_DIR=public/images/uploads
COOKIE_MAX_AGE=86400000
COOKIE_SECURE=false
COOKIE_HTTP_ONLY=true
```

## 📁 Project Structure

```
├── 📄 app.js                 # Main application file
├── 📁 config/
│   └── multerConfig.js       # File upload configuration
├── 📁 models/
│   ├── user.js              # User data model
│   └── post.js              # Post data model
├── 📁 views/
│   ├── signup.ejs           # User registration page
│   ├── login.ejs            # User login page
│   ├── profile.ejs          # User profile page
│   ├── post.ejs             # Posts feed page
│   └── ...                  # Other view templates
├── 📁 public/
│   ├── 🎨 stylesheet/
│   ├── ⚡ javascript/
│   └── 🖼️ images/
└── 📄 package.json          # Project dependencies
```

## 🎯 Key Features Breakdown

### 🔐 Authentication System
- Secure user registration and login
- JWT-based session management
- Password encryption with bcrypt
- Protected routes middleware

### 👤 User Management
- Profile creation and editing
- Profile picture uploads
- User information display

### 📝 Content Management
- Create new posts
- Edit existing posts
- Like/unlike functionality
- Real-time content updates

### 🎨 Modern UI/UX
- Sharp, bold design aesthetic
- Dark/Light theme toggle
- Responsive layout
- Smooth interactions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

⭐ **Star this repository if you found it helpful!**
        
