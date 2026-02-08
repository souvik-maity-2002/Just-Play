# 🔗 Backend & Frontend Connection Guide

## ✅ Setup Complete

Your backend and frontend are now configured to work together!

---

## 🚀 Start Instructions

### Step 1: Start the Backend

Open a terminal and run:

```bash
cd backend
npm install  # (if you haven't already)
npm run dev
```

You should see:
```
⚙️ Server is running at port : 8000
```

### Step 2: Start the Frontend  

Open **another** terminal and run:

```bash
cd frontend-app
npm install  # (if you haven't already)
npm run dev
```

The frontend will automatically open at:
```
http://localhost:3000
```

---

## 🔌 Connection Details

### Backend
- **Server URL**: http://localhost:8000
- **API Base URL**: http://localhost:8000/api/v1
- **Database**: MongoDB (configured in backend/.env)
- **CORS**: Enabled for all origins

### Frontend
- **Frontend URL**: http://localhost:3000
- **API Configuration**: `.env` file with `VITE_API_URL`
- **Connect Point**: `src/services/api.js`

---

## 📋 Backend Configuration (Already Set)

Your backend `.env` includes:

```env
PORT=8000
MONGODB_URI=mongodb+srv://iamsouvikmaity2002_db_user:souvik123@cluster0.uomj1hg.mongodb.net/
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.owv7q9nVbW5tqUezF_G2nHTra-ANW3HqW9epyVwh08Y-Z-FKsnG8eBIpC4GTfTVU
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=dbzulqeik
CLOUDINARY_API_KEY=132442489868333
CLOUDINARY_API_SECRET=ssZVOvd435WpzOPXAgbhF9fqy4A
```

---

## 📋 Frontend Configuration (Set Up)

Your frontend `.env` includes:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

## ✨ What's Connected

### API Endpoints Working:

✅ **Authentication**
- Register users
- Login
- Logout
- JWT token management

✅ **Videos**
- Upload videos
- Browse videos
- Watch videos
- Delete videos
- Edit metadata

✅ **Social Features**
- Comments
- Likes
- Subscriptions
- Playlists

✅ **Dashboard**
- Channel statistics
- Video management

---

## 🧪 Test the Connection

### 1. Start Both Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend-app
npm run dev
```

### 2. Open Frontend

Go to: `http://localhost:3000`

### 3. Try Registration

1. Click "Sign up"
2. Fill in the form
3. Upload an avatar
4. Click "Create Account"

If it works, you're connected! ✅

### 4. Check Browser Console

Open DevTools (F12) → Console tab:
- No CORS errors? ✅ Connected
- No 404 errors? ✅ Backend running
- No fetch errors? ✅ All good

### 5. Check Network Tab

In DevTools → Network tab:
- Click "Sign up"
- Watch for API requests to `localhost:8000`
- See responses? ✅ Connected

---

## 🐛 Troubleshooting

### Frontend Shows "Cannot reach server"

**Solution 1**: Verify backend is running
```bash
# In a new terminal, test backend
curl http://localhost:8000/api/v1/healthcheck
```

You should get a response (not an error).

**Solution 2**: Check .env file
```bash
# Verify VITE_API_URL is correct
cat frontend-app/.env
# Should show: VITE_API_URL=http://localhost:8000/api/v1
```

**Solution 3**: Check if port 8000 is in use
```bash
# Windows
netstat -ano | findstr :8000

# Mac/Linux
lsof -i :8000
```

### CORS Error in Console

**This might happen if:**
- Backend CORS_ORIGIN setting is wrong
- Requests coming from wrong origin

**Check backend .env:**
```env
CORS_ORIGIN=*  # Allows all origins
```

### "Cannot POST /api/v1/users/register"

**Solution**: Backend API routes not set up
- Verify backend is running
- Check backend has user routes in `src/routes/user.routes.js`

### Token Issues

**Solution**: Clear localStorage and try again
```javascript
// In browser console
localStorage.clear()
// Then try logging in again
```

---

## 📱 API Flow Example

### User Registration Flow:

1. **Frontend** (React Component)
   ```
   User fills form → Click "Sign up"
   ```

2. **Frontend** (authService.js)
   ```
   POST http://localhost:8000/api/v1/users/register
   ```

3. **Backend** (user.routes.js)
   ```
   Receives request → Validates data → Saves to MongoDB
   ```

4. **Backend Response**
   ```
   Returns: { user: {...}, token: "..." }
   ```

5. **Frontend** (authStore.js)
   ```
   Saves token → Updates user state → Redirects to home
   ```

---

## 🔒 Authentication Flow

The connection uses JWT tokens:

1. Register/Login → Get token
2. Token stored in `localStorage`
3. Each request includes token in headers
4. Token auto-refreshed before expiry
5. Logout → Token cleared

---

## 📊 System Architecture

```
Frontend (React)                Backend (Express)
├── http://localhost:3000      └── http://localhost:8000
├── Vite Dev Server                 Express Server
├── Services (Axios)                MongoDB
├── State (Zustand)                 Controllers
└── UI (React Components)           Routes & Models
        ↑                               ↑
        └── API Requests/Responses ────┘
                   (HTTP)
```

---

## ⚙️ API Base URL Configuration

### Current Setup:
```javascript
// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL 
                     || 'http://localhost:8000/api/v1'
```

### To Change Backend URL:

Edit `frontend-app/.env`:
```env
VITE_API_URL=http://your-backend-url/api/v1
```

Then restart frontend:
```bash
npm run dev
```

---

## 🚀 Production Deployment

When deploying:

1. **Backend** - Deploy to your server (Heroku, AWS, etc.)
2. **Frontend** - Update `.env` with production backend URL
3. **Build** - Run `npm run build`
4. **Deploy** - Deploy `dist/` folder

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Start Backend | `cd backend && npm run dev` |
| Start Frontend | `cd frontend-app && npm run dev` |
| Build Frontend | `cd frontend-app && npm run build` |
| Test Backend | `curl http://localhost:8000/api/v1/healthcheck` |
| View Logs | Check terminal output |
| Clear Cache | `localStorage.clear()` in console |

---

## ✅ Verification Checklist

- [ ] Backend `.env` file exists
- [ ] Backend is running on port 8000
- [ ] Frontend `.env` file exists
- [ ] Frontend is running on port 3000
- [ ] No CORS errors in console
- [ ] No API connection errors
- [ ] Can register a user
- [ ] Can login
- [ ] Can upload a video
- [ ] Can view videos

---

## 🎉 Connected and Ready!

Your backend and frontend are now fully configured and connected. 

**Start both servers and begin building!** 🚀

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend-app
npm run dev
```

Then open: **http://localhost:3000**

---

Need help? Check the troubleshooting section above! 💡
