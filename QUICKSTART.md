# Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

## Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start JSON Server** (Terminal 1)
   ```bash
   npm run json-server
   ```
   This will start the mock API server on `http://localhost:3001`

3. **Start Development Server** (Terminal 2)
   ```bash
   npm run dev
   ```
   This will start the Vue app on `http://localhost:5173`

4. **Open Browser**
   Navigate to `http://localhost:5173`

## Login Credentials

**Admin:**
- Email: `admin@example.com`
- Password: `admin123`

**User:**
- Email: `user@example.com`
- Password: `user123`

## Features to Test

1. **Public Features:**
   - Browse posts on home page
   - Search posts by title
   - Filter by category
   - View individual post details
   - Pagination

2. **Authentication:**
   - Login/Register
   - Protected routes (admin dashboard)

3. **Admin Features:**
   - View dashboard with analytics
   - Create new posts
   - Edit existing posts
   - Delete posts
   - View profile

## Project Structure

All files are organized according to Vue 3 best practices:
- Components in `src/components/`
- Views in `src/views/`
- Stores (Pinia) in `src/stores/`
- Router in `src/router/`
- Services in `src/services/`

## Troubleshooting

- **Port already in use**: Change ports in `vite.config.js` or `package.json`
- **API not working**: Ensure JSON Server is running on port 3001
- **Styles not loading**: Run `npm install` to ensure Tailwind is installed

