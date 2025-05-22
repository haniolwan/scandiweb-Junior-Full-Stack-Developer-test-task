# PHP Project Setup Guide

This project consists of a PHP backend with MySQL database and a frontend client application.

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- PHP (version 7.4 or higher)
- Apache Web Server
- MySQL/MariaDB
- Composer (PHP dependency manager)
- Node.js and npm (for frontend)

## Installation Steps

### 1. Install PHP, Apache, and MySQL

### 2. Install Composer

#### Install PHP Dependencies

Navigate to the project root directory and run:

```bash
composer install
```

#### Database Setup

1. **Create the database and user** (if needed):

   ```sql
   mysql -u root -p
   CREATE DATABASE scandiweb;
   CREATE USER 'scandiweb_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON scandiweb.* TO 'scandiweb_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

2. **Import the SQL file**:

   ```bash
   mysql -u root -p scandiweb < db/scandiweb.sql
   ```

   Or if you created a specific user:

   ```bash
   mysql -u scandiweb_user -p scandiweb < db/scandiweb.sql
   ```

#### Configure Database Connection

Update your database configuration file (usually `.env` or similar) with your database credentials:

```php
$host = 'localhost';
$dbname = 'scandiweb';
$username = 'scandiweb_user';
$password = 'your_password';
```

### 5. Frontend Setup

Navigate to the `client/` directory:

```bash
cd client/
```

#### Install Node.js Dependencies

```bash
npm install
```

#### Start the Development Server

```bash
npm run dev
```

## Running the Application

### Backend

The PHP backend should be accessible at:

- **Local development**: `http://localhost/` (if project is in document root)
- **XAMPP**: `http://localhost/project_name/`
- **Custom setup**: `https://main.d97p8wfejo9em.amplifyapp.com/`

The main entry point is `./index.php` in the root directory.

### Frontend

The frontend development server will typically run on:

- `http://localhost:5173` (or the port specified by your npm dev script)

## Project Structure

```
project-root/
├── index.php              # Main PHP entry point
├── composer.json          # PHP dependencies
├── db/
│   └── scandiweb.sql     # Database schema and data
├── client/               # Frontend application
│   ├── package.json      # Node.js dependencies
│   └── ...              # Frontend source files
└── ...                  # Other PHP files
```

## Passed Test Cases

![Test Results](https://ibb.co/GfYTfBwc)
