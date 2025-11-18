# AMANAT - Aplikasi Manajemen Surat dan Arsip Terpadu

![AMANAT Logo](public/logoYPTU.png)

Sistem manajemen surat digital untuk Yayasan Pendidikan Telkom University.

## 📋 Features

- 📨 **Manajemen Surat Masuk & Keluar** - Kelola surat masuk dan keluar dengan mudah
- 📋 **Sistem Disposisi** - Tracking disposisi surat real-time
- 📦 **Arsip Digital** - Penyimpanan dan pencarian arsip surat
- 📊 **Laporan & Analytics** - Dashboard dan laporan visual dengan charts
- 👥 **Multi-role User Management** - 5 role sistem dengan 7 posisi berbeda (Kepala Bagian memiliki 3 variasi)
- 🔐 **Authentication & Authorization** - Sistem login yang aman

## 🎨 Role & Permissions

Sistem ini memiliki **5 role** secara teknis, namun dalam implementasi dunia nyata terdapat **7 posisi** karena Kepala Bagian memiliki 3 variasi bagian yang berbeda:

### 5 Role Sistem:
1. **Sekretaris Kantor** - Admin utama, akses penuh
2. **Ketua Pengurus** - Review dan disposisi surat
3. **Sekretaris Pengurus** - Koordinasi dan follow-up
4. **Bendahara Pengurus** - Surat terkait keuangan
5. **Kepala Bagian** - Eksekusi disposisi (dengan field `bagian` yang dapat berbeda)

### 7 Posisi di Dunia Nyata:
1. **Sekretaris Kantor** - Admin utama, akses penuh
2. **Ketua Pengurus** - Review dan disposisi surat
3. **Sekretaris Pengurus** - Koordinasi dan follow-up
4. **Bendahara Pengurus** - Surat terkait keuangan
5. **Kepala Bagian PSDM** - Eksekusi disposisi untuk bagian PSDM
6. **Kepala Bagian Keuangan** - Eksekusi disposisi untuk bagian Keuangan
7. **Kepala Bagian Umum** - Eksekusi disposisi untuk bagian Umum

> **Catatan:** Role "Kepala Bagian" dalam sistem menggunakan field `bagian` untuk membedakan antara PSDM, Keuangan, dan Umum. Setiap Kepala Bagian memiliki akses yang sama namun hanya dapat melihat dan menangani surat yang terkait dengan bagiannya masing-masing.

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State Management:** Zustand
- **Charts:** Recharts
- **HTTP Client:** Axios
- **Form:** React Hook Form + Zod
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 16
npm >= 8
```

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/fe-amanat.git
cd fe-amanat

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file sesuai konfigurasi
# VITE_API_BASE_URL=http://localhost:8000/api
```

### Development

```bash
# Run development server
npm run dev

# App akan berjalan di http://localhost:5173
```

### Build for Production

```bash
# Build production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
FE-AMANAT/
├── public/              # Static assets
├── src/
│   ├── api/            # API configuration & services
│   │   ├── config/
│   │   │   └── axios.config.js
│   │   └── services/
│   │       ├── authService.js
│   │       ├── suratService.js
│   │       └── userService.js
│   ├── assets/         # Images, icons
│   ├── components/     # Reusable components
│   │   ├── common/    # Button, Modal, Badge, etc
│   │   ├── layout/    # Sidebar, Header, MainLayout
│   │   └── features/  # Feature-specific components
│   ├── pages/         # Page components
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── surat-masuk/
│   │   ├── surat-keluar/
│   │   ├── disposisi/
│   │   ├── arsip/
│   │   ├── laporan/
│   │   └── pengaturan/
│   ├── routes/        # Route configuration
│   ├── store/         # Zustand stores
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Helper functions
│   ├── App.jsx        # Main App component
│   └── main.jsx       # Entry point
├── .env.example       # Environment variables template
├── .eslintrc.cjs      # ESLint configuration
├── .prettierrc        # Prettier configuration
├── cypress.config.js  # Cypress E2E testing config
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests with Cypress
npm run cypress:open

# Run E2E tests headless
npm run cypress:run
```

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run test         # Run unit tests
npm run cypress:open # Open Cypress E2E test runner
```

## 🎨 Code Style

Project ini menggunakan:

- **ESLint** untuk code linting
- **Prettier** untuk code formatting

```bash
# Format semua file
npm run format

# Fix linting issues
npm run lint:fix
```

## 📸 Screenshots

### Login Page

![Login](screenshot/login.png)

### Dashboard

![Dashboard](screenshot/dashboard.png)

### Surat Masuk

![Surat Masuk](screenshot/surat-masuk.png)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Your Name** - [GitHub](https://github.com/your-username)

## 🙏 Acknowledgments

- Yayasan Pendidikan Telkom University
- React Team
- Vite Team
- Tailwind CSS Team
