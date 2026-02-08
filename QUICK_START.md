# ⚡ Quick Start - Backend + Frontend Connection

## 🎯 One Command to Start Everything

### On Windows:
```bash
start-servers.bat
```

### On Mac/Linux:
```bash
bash start-servers.sh
```

This will:
✅ Install dependencies  
✅ Start backend on port 8000  
✅ Start frontend on port 3000  
✅ Auto-open browser  

---

## 📋 Manual Start (If Preferred)

### Terminal 1 - Start Backend:
```bash
cd backend
npm install  # (first time only)
npm run dev
```

Wait for: `⚙️ Server is running at port : 8000`

### Terminal 2 - Start Frontend:
```bash
cd frontend-app
npm install  # (first time only)
npm run dev
```

The browser will auto-open at `http://localhost:3000`

---

## ✅ Verify Connection

1. **Open frontend**: http://localhost:3000
2. **Click "Sign up"**
3. **Fill registration form** (all fields required)
4. **Upload avatar** (required)
5. **Click "Create Account"**

If it works → ✅ **Backend & Frontend Connected!**

---

## 🧪 Test Each Feature

| Feature | How to Test |
|---------|------------|
| Register | Sign up with email & avatar |
| Login | Login with registered credentials |
| Upload | Click Upload, select video & thumbnail |
| Browse | Go home to see videos |
| Comments | Watch a video, add comment |
| Like | Click heart icon on video |
| Subscribe | Click subscribe on channel |
| Playlist | Create & manage playlists |
| Dashboard | View your channel stats |

---

## 🔍 Check Browser Console

Press `F12` and go to **Console** tab:

- No red errors? ✅ Good
- No CORS errors? ✅ Good  
- See API requests? ✅ Connected

Go to **Network** tab:

- Click signup
- Look for requests to `localhost:8000`
- See responses? ✅ Connected

---

## 📁 Files & Configuration

**Backend** `.env`:
```
PORT=8000
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=*
```

**Frontend** `.env`:
```
VITE_API_URL=http://localhost:8000/api/v1
```

---

## 🚨 If Connection Fails

### Check Backend Running:
```bash
# Open new terminal
curl http://localhost:8000/api/v1/healthcheck
```

Should return a response (not error).

### Check Frontend .env:
```bash
# Should exist and contain:
cat frontend-app/.env
```

Should show: `VITE_API_URL=http://localhost:8000/api/v1`

### Clear Browser Cache:
```javascript
// In browser console (F12):
localStorage.clear()
// Refresh page
```

---

## 📊 What's Now Connected

✅ User Authentication (Register, Login, Logout)  
✅ Video Upload & Streaming  
✅ Comments System  
✅ Likes & Subscriptions  
✅ Playlists  
✅ Channel Management  
✅ Dashboard with Stats  

---

## 🎉 You're Ready!

**Run one of these:**

**Windows:**
```bash
start-servers.bat
```

**Mac/Linux:**
```bash
bash start-servers.sh
```

**Or manually:**
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2 (new window)
cd frontend-app
npm run dev
```

Then open: **http://localhost:3000** ✨

---

## 📞 Still Having Issues?

1. **Check** `CONNECTION_GUIDE.md` for detailed troubleshooting
2. **Verify** both servers are running (check terminal output)
3. **Look** at browser console for error messages
4. **Restart** both servers (ctrl+c then npm run dev again)

---

**Happy building!** 🚀
