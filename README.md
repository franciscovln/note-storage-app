# Simple Notes - Minimalist Notes App

A modern and ultra-simple notes app built with Next.js, React, and JavaScript. All notes are stored locally in your browser, with no backend, no database, and no authentication.

## ✨ Main Features

- 📝 **Create and edit notes**
- 🔒 **5000 characters limit per note**
- 🗑️ **Delete notes**
- ℹ️ **View note information**
- 💾 **Download notes**
- 📅 **Current date**
- 📚 **Always-visible sidebar**
- 🎨 **Modern, minimalist, and responsive interface**
- 🚀 **Instant deployment on Vercel**

## 🚀 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/franciscovln/cursor-note-app.git
cd cursor-note-app
```
2. **Install dependencies:**
```bash
npm install
```
3. **Run in development mode:**
```bash
npm run dev
```
4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🛠️ Technologies Used
- **Next.js**
- **React**
- **JavaScript**

## 📱 Features

### Notes Management
- Create new notes (up to 10)
- Edit title and content in real time
- Delete notes with custom confirmation
- 5000 characters limit per note
- 2 seconds cooldown to prevent spam

### User Interface
- Always-visible sidebar with notes list
- Preview of each note's content
- Responsive design for all devices
- Motivational messages and friendly UI when there are no notes

### Note Information
- Creation and last modification date
- Word and character counter
- Unique note ID

### Export
- Download notes as .txt files
- File name based on the note title

## 🔒 Security
- **No backend:** No server or database
- **Local storage:** Your notes exist only in your browser
- **No authentication:** No credentials required
- **No XSS:** Notes content is plain text, no code is executed
- **Character and note limits:** Prevents saturation and excessive resource usage

## 📁 Project Structure
```
simple-notes/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.js            # Main layout
│   └── page.js              # Main page
├── components/
│   ├── NotesApp.js          # Main component
│   ├── Header.js            # Header with date and GitHub
│   ├── Sidebar.js           # Sidebar with notes list
│   ├── NoteEditor.js        # Note editor
│   ├── InfoModal.js         # Info modal
│   ├── ConfirmModal.js      # Confirmation modal
│   └── Toast.js             # Notifications
├── package.json
├── next.config.js
├── vercel.json
└── README.md
```

## 🎨 Customization

### Colors
Edit the CSS variables in `app/globals.css`:
```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1e40af;
  --background-color: #ffffff;
  --sidebar-color: #f1f5f9;
  --text-color: #1e293b;
  --border-color: #e2e8f0;
}
```

## 🙏 Acknowledgements
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Vercel](https://vercel.com/)
- [Tabler Icons](https://tabler-icons.io/)

---

**Enjoy writing your notes! 📝✨** 