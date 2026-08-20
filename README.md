# Varad Netralaya - Eye Hospital Management System

A complete full-stack web application for Varad Netralaya, featuring a patient portal, doctor dashboard, admin panel, and an AI-powered medical document scanner.

## Features

- **Public Website**: Landing page, doctors portfolio, services, and hospital gallery.
- **Role-based Auth**: JWT authentication for `ADMIN`, `DOCTOR`, and `PATIENT` roles.
- **Appointment Booking**: Real-time slot availability to prevent double booking.
- **Dashboards**: Separate, secure dashboards for each role.
- **AI Document Scanner**: Uses Tesseract.js (or an external OCR provider) to scan uploaded prescriptions/reports and extract structured data automatically.
- **Medical Records**: Doctors can create and manage medical records and prescriptions.

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, React Router, Axios
- **Backend**: Node.js, Express.js, MySQL2, JWT, bcryptjs, Multer, Tesseract.js
- **Database**: MySQL

## Setup Instructions

### 1. Database Setup
1. Open your MySQL client (e.g. phpMyAdmin, MySQL Workbench).
2. Execute the `database/schema.sql` file to create the tables.
3. Execute the `database/seed.sql` file to insert demo data.

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=eye_hospital
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   (The server will run on `http://localhost:5000`)

### 3. Frontend Setup
1. Open another terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and verify the API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   (The frontend will run on `http://localhost:5173`)

## Demo Credentials

You can log in to the system using the following demo accounts:

- **Admin**: `admin@varadnetralaya.com` | Password: `Admin@123`
- **Doctor**: `dr.borude@varadnetralaya.com` | Password: `Doctor@123`
- **Patient**: `ramesh.sharma@example.com` | Password: `Patient@123`

## AI/OCR Scanner Setup
The AI Medical Scanner is configured to use **Tesseract.js** by default (`AI_PROVIDER=tesseract`). This runs completely locally in Node.js and requires no API key.
If you prefer, you can set `AI_PROVIDER=mock` in your backend `.env` file to skip processing time during UI testing.

## Folder Structure

```
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection
│   │   ├── controllers/     # API Logic (Auth, Appointments, AI, etc.)
│   │   ├── middleware/      # JWT Auth, Roles, File Uploads
│   │   ├── routes/          # Express Routers
│   │   ├── services/        # AI Service, Appointment Checks
│   │   ├── app.js           # Express App setup
│   │   └── server.js        # Server Entry point
│   ├── uploads/             # Medical documents and scans
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # UI Components (Hero, Forms, Scanner)
│   │   ├── context/         # Auth and Theme Context
│   │   ├── layouts/         # PublicLayout, DashboardLayout
│   │   ├── pages/           # Admin, Doctor, Patient Dashboards
│   │   ├── services/        # Axios API Client
│   │   └── App.jsx          # React Router Setup
│   └── package.json
│
└── database/
    ├── schema.sql           # MySQL Structure
    └── seed.sql             # Demo Data
```
