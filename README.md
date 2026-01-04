# Vehicle Rental System

**Live URL:** [https://vehicle-rental-system-omega-green.vercel.app/](https://vehicle-rental-system-omega-green.vercel.app/)

---

## Project Overview

This project is a **[brief description of your project, e.g., Vehicle Booking System]** that allows customers to book vehicles, manage bookings, and enables admin users to manage vehicles and bookings efficiently. The system ensures automated status updates and role-based access control.

---

## Features

- **User Management**: Admin can view, update, and delete users.
- **Vehicle Management**: Admin can add, update, and track vehicle availability.
- **Booking System**:
  - Customers can create and cancel bookings.
  - Admins can mark bookings as returned.
  - Automatic update of booking status when the rental period ends.
- **Role-Based Access Control**: Customer vs Admin permissions.
- **API Endpoints**: Fully RESTful API for all operations.
- **Real-Time Updates**: Vehicle availability status updated automatically after booking completion.
  
---

## Technology Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: NeonDB
- **Authentication**: JWT (JSON Web Tokens)
- **Task Scheduling**: Node-Cron (for auto-updating bookings)
- **Other Tools**: ESLint, Prettier for code quality

---

## Setup & Usage

### 1. Clone the repository

```bash
git clone https://github.com/Sifat2245/vehicle-rental-system.git
cd your-repo

```
### 2. Install Dependencies and run the project
```bash
npm i
npm run dev
