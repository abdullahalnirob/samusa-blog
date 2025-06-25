# 📝 Samusa Blog

**Live URL:** [https://samusa-blog.web.app](https://samusa-blog.web.app)

Welcome to the **Samusa Blog Website Development Project**! This modern and responsive blog platform is designed to deliver a smooth reading and publishing experience. Built using **React**, **Firebase**, and **Tailwind CSS**, it showcases clean design, fast performance, and dynamic features.

---

## 🎯 Project Theme

We’re building a next-generation blog website designed for both readers and writers. With intuitive UI, real-time interactions, and seamless performance, **Samusa Blog** makes it easy to discover, share, and engage with content.

As a front-end project, it emphasizes:
- Beautiful, responsive interfaces
- Real-time data fetching
- Easy navigation and engagement
- Scalable component-based architecture

---

## 🚀 Key Features

- 📰 View blog posts with featured images, author details, and timestamps
- 🧑‍💻 Create an account to access personalized features
- ✍️ Create and publish your own blog posts
- 📌 Add blog posts to a **wishlist** for later reading
- 📝 Update or edit previously published blog posts
- 🔍 Dynamic routing for individual blog pages
- ⚡ Firebase-based backend integration (authentication, database, etc.)
- 🧭 Navigation via `react-router-dom` v7
- 🍞 Toast notifications for user feedback
- 🌙 Light and smooth animations via Framer Motion
- 📱 Fully responsive UI for mobile, tablet, and desktop
- 🔐 Secure and modern Firebase setup


## 🛠️ Tech Stack

### 🧩 Frontend

| Category       | Tools & Libraries                             |
|----------------|-----------------------------------------------|
| Framework      | React 19                                      |
| Build Tool     | Vite 6                                        |
| Styling        | Tailwind CSS 4, MUI, Emotion                  |
| Routing        | React Router DOM v7.6                         |
| Animation      | Framer Motion                                 |
| Notifications  | React Hot Toast                               |
| Image Preview  | React Photo View                              |
| Skeleton Load  | React Loading Skeleton                        |
| Firebase       | Firebase 11 (Auth, Firestore, Hosting)        |
| HTTP Client    | Axios                                         |

---

### 🔧 Backend

| Category         | Tools & Libraries                        |
|------------------|------------------------------------------|
| Runtime          | Node.js                                  |
| Framework        | Express.js 5                             |
| Database         | MongoDB 6,                               |
| Authentication   | JSON Web Tokens (JWT)                    |
| Environment Vars | dotenv                                   |
| Middleware       | CORS, Body-Parser, Cookie-Parser         |
| Development Tool | Nodemon                                  |
| Hosting (Opt.)   | Vercel                                   |

---

## 📁 Folder Structure

```
samusa-blog/
├── .firebase/ # Firebase deployment configs
├── dist/ # Production build output
├── node_modules/ # Project dependencies
├── public/ # Static assets
├── src/ # Source code
│ ├── assets/ # Images, fonts, static files
│ ├── components/ # UI components
│ ├── Context/ # React Context providers
│ ├── firebase/ # Firebase config and logic
│ ├── hook/ # Custom React hooks
│ ├── router/ # Route definitions
│ ├── App.jsx # Main app wrapper
│ ├── main.jsx # App entry point
│ └── index.css # Global styles
├── .env.local # Environment variables
├── firebase.json # Firebase project config
├── vite.config.js # Vite build config
├── package.json # Project metadata and scripts
└── README.md # Project documentation
```


## 📦 Installation
### 1. Clone the repository
```
git clone https://github.com/your-username/samusa-blog.git
cd samusa-blog
```

### 2. Install dependencies

```
npm install
```

### 3. Configure Firebase

```
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_messaging_id
VITE_APP_ID=your_app_id
```

### 4. Run the development server
```
npm run dev
```

## 👨‍💻 Author
Abdullah Al Nirob
📫 Email: abdullahalnirob12@gmail.com
🌐 Facebook: facebook.com/dev.abdullahalnirob


## Thank you 😍
