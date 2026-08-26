# Authentication System - Pulau Pedia Admin

## 📋 Overview

Sistem autentikasi simple menggunakan session cookies untuk protect halaman admin.

## 🔐 Credentials Default

- **Username**: `admin`
- **Password**: `admin123`

## 📁 File Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts          # Login API
│   │       ├── logout/route.ts         # Logout API
│   │       └── session/route.ts        # Check session API
│   ├── login/
│   │   └── page.tsx                    # Login page
│   └── admin/
│       └── layout.tsx                  # Admin layout
├── components/
│   └── admin/
│       └── nav-user.tsx                # Logout button component
├── middleware.ts                       # Route protection
└── database-auth-setup.sql             # Database schema

```

## 🚀 Setup Instructions

### 1. Jalankan SQL untuk membuat tabel users

Jalankan file `database-auth-setup.sql` di phpMyAdmin atau MySQL client:

```sql
USE pulau_pedia3101;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'admin',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (username, password, name, role) VALUES
('admin', '$2b$10$rqZ1FvL5y.Ld9EYqJxp9HuN5mFLxGVGnK4xZQX8mKqV6YQVxqKj0y', 'Administrator', 'admin')
ON DUPLICATE KEY UPDATE updatedAt = NOW();
```

### 2. Test Login

1. Akses `http://localhost:3000/login`
2. Masukkan credentials:
   - Username: `admin`
   - Password: `admin123`
3. Klik "Login"
4. Akan redirect ke `/admin`

### 3. Test Protection

1. Coba akses `http://localhost:3000/admin` tanpa login
2. Otomatis redirect ke `/login`
3. Setelah login, bisa akses `/admin`

### 4. Test Logout

1. Di halaman admin, klik dropdown user di sidebar (bawah kiri)
2. Klik "Log out"
3. Otomatis redirect ke `/login`
4. Session cookie dihapus

## 🔧 Cara Kerja

### Login Flow

```
User akses /login
    ↓
Input username & password
    ↓
POST /api/auth/login
    ↓
Verify dengan database (bcrypt)
    ↓
Valid? → Set cookie 'admin-session' → Redirect /admin
    ↓
Invalid? → Show error message
```

### Protection Flow

```
User akses /admin/*
    ↓
Middleware check cookie 'admin-session'
    ↓
Cookie exists? → Parse & verify → Allow access
    ↓
No cookie? → Redirect /login
```

### Logout Flow

```
User klik "Log out"
    ↓
POST /api/auth/logout
    ↓
Clear cookie 'admin-session'
    ↓
Redirect /login
```

## 🔒 Security Features

✅ **Password hashing** dengan bcrypt (10 rounds)
✅ **HTTP-only cookies** (tidak bisa diakses JavaScript)
✅ **Secure flag** di production (HTTPS only)
✅ **SameSite: lax** (CSRF protection)
✅ **Session timeout** 24 jam
✅ **Middleware protection** untuk semua /admin/* routes
✅ **Auto redirect** jika sudah login tapi akses /login

## 📝 API Endpoints

### POST `/api/auth/login`

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login berhasil",
  "user": {
    "id": 1,
    "username": "admin",
    "name": "Administrator",
    "role": "admin"
  }
}
```

**Response (Error):**
```json
{
  "error": "Username atau password salah"
}
```

### POST `/api/auth/logout`

**Response:**
```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

### GET `/api/auth/session`

**Response (Authenticated):**
```json
{
  "authenticated": true,
  "user": {
    "id": 1,
    "username": "admin",
    "name": "Administrator",
    "role": "admin"
  }
}
```

**Response (Not Authenticated):**
```json
{
  "authenticated": false
}
```

## 🛠 Menambah User Baru

Gunakan bcrypt untuk hash password:

```javascript
const bcrypt = require('bcryptjs');
const password = 'newpassword123';
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
```

Kemudian insert ke database:

```sql
INSERT INTO users (username, password, name, role) 
VALUES ('newuser', '$2b$10$...hash...', 'New User', 'admin');
```

## ⚠️ Troubleshooting

### Masalah: Redirect loop /login → /admin → /login

**Solusi:** Clear cookies browser atau hapus cookie `admin-session`

### Masalah: Password salah terus

**Solusi:** Cek hash password di database, pastikan menggunakan bcrypt dengan 10 rounds

### Masalah: Tidak bisa logout

**Solusi:** Cek network tab, pastikan POST `/api/auth/logout` berhasil (200 OK)

### Masalah: Setelah login tetap redirect ke login

**Solusi:** Cek apakah cookie `admin-session` ter-set di browser (DevTools → Application → Cookies)

## 🎯 Next Steps (Optional)

- [ ] Remember me functionality
- [ ] Password reset via email
- [ ] Two-factor authentication (2FA)
- [ ] Activity logging
- [ ] Multiple user roles dengan permissions
- [ ] User management page di admin

## 📌 Notes

- Session disimpan di cookie, bukan database (stateless)
- Cookie expire after 24 jam
- Middleware protect semua routes `/admin/*`
- Login page accessible tanpa auth
- Setelah login, `/login` auto redirect ke `/admin`
