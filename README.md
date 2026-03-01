# QuickHire — Job Board Platform

> Client for the **QuickHire Job Board Platform** built with Next.js App Router. Provides job search, applications and admin dashboard management with a clean and responsive UI.

## 🚀 Features

- Landing page with hero, categories, featured jobs and latest jobs
- Job listings with search, filters and pagination
- Job detail page with application form
- JWT-based admin dashboard
- Fully responsive UI using Tailwind CSS

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod
- **HTTP Client:** Axios
- **Authentication:** React Context API + js-cookie
- **Notifications:** React Hot Toast
- **Icons:** React Icons

---

## ⚡ Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- QuickHire server running at `http://localhost:5000`

---

### Installation

```bash
cd quickhire-client
npm install
```

---

### Environment Setup

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

### Run Development Server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 📂 Application Routes

| Route             | Description                                         |
| ----------------- | --------------------------------------------------- |
| `/`               | Homepage (hero, categories, featured & latest jobs) |
| `/jobs`           | Job listings with search and filters                |
| `/jobs/[id]`      | Job details and apply form                          |
| `/admin`          | Admin dashboard                                     |
| `/admin/login`    | Admin login                                         |
| `/admin/register` | Admin registration                                  |

---

## 🧩 Main Components

### Layout

- Navbar
- Footer

### Jobs

- JobCard
- JobFilters
- ApplyForm

### UI

- HeroSearchBar
- SearchBar
- LoadingSpinner

---

## 👨‍💼 Admin Dashboard

Admin panel includes:

- Manage job listings
- View submitted applications
- Post new jobs

---

## 📜 Available Scripts

```bash
npm run dev     # start development server
npm run build   # create production build
npm start       # run production server
npm run lint    # run ESLint
```
