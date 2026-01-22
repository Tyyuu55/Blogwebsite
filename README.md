 HEAD
# Blogwebsite

# Vue Blog CMS

A modern, fully-styled blog and content management system built with Vue 3, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Responsive Design**: Mobile-first approach, works on all devices
- **Authentication**: JWT-style authentication with protected routes
- **Blog Management**: Full CRUD operations for blog posts
- **Admin Dashboard**: Analytics, charts, and post management
- **Search & Filter**: Search posts by title and filter by category
- **Pagination**: Efficient post pagination
- **State Management**: Pinia for centralized state management

## 🛠️ Tech Stack

- **Vue 3** (Composition API)
- **Vite** - Build tool
- **Vue Router** - Routing
- **Pinia** - State management
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Chart.js** - Analytics charts
- **JSON Server** - Mock REST API

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the JSON Server (in a separate terminal):
```bash
npm run json-server
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔐 Demo Credentials

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

**User Account:**
- Email: `user@example.com`
- Password: `user123`

## 📁 Project Structure

```
src/
 ├── assets/
 ├── components/
 │   ├── Navbar.vue
 │   ├── Footer.vue
 │   ├── PostCard.vue
 │   ├── Loader.vue
 │   ├── Pagination.vue
 │   └── Modal.vue
 ├── views/
 │   ├── Home.vue
 │   ├── PostDetail.vue
 │   ├── Login.vue
 │   ├── Register.vue
 │   ├── AdminDashboard.vue
 │   ├── CreatePost.vue
 │   ├── EditPost.vue
 │   └── Profile.vue
 ├── router/
 │   └── index.js
 ├── stores/
 │   ├── authStore.js
 │   └── postStore.js
 ├── services/
 │   └── api.js
 ├── App.vue
 ├── main.js
 └── index.css
```

## 🎨 Design System

### Colors
- Primary: `#2563eb` (Blue)
- Secondary: `#0f172a` (Dark slate)
- Background: `#f8fafc`
- Card: `#ffffff`
- Text: `#1e293b`
- Muted: `#64748b`
- Danger: `#dc2626`

### Typography
- System font stack for optimal performance

## 🧭 Routes

- `/` - Blog home page
- `/post/:id` - Single blog post
- `/login` - Login page
- `/register` - Registration page
- `/admin` - Admin dashboard (protected)
- `/admin/create` - Create new post (protected)
- `/admin/edit/:id` - Edit post (protected)
- `/profile` - User profile (protected)

## 🚀 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📝 License

MIT
 2f3b01d (Initial commit)
