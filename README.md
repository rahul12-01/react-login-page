# Project Setup Guide

## Overview

This project consists of a **React Vite frontend** and a **Node.js + Express backend** using **MongoDB Atlas** as the database.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+ recommended)
- **npm**
- **MongoDB Atlas** account with a configured cluster

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies

#### For Backend

```bash
cd backend
npm install
```

#### For Frontend

```bash
cd frontend
npm install
```

## Running the Project

### Start Frontend and Backend Simultaneously

Navigate to the root project folder and run:

```bash
npm install -g concurrently  # If not installed
npm run dev
```

This will start both the frontend and backend.

### Manually Start Each

#### Start Backend

```bash
cd backend
npm start
```

#### Start Frontend

```bash
cd frontend
npm run dev
```

## Project Structure

```
project-root/
│── backend/    # Node.js + Express API
│── frontend/   # React Vite frontend
│── package.json  # Root script for concurrent startup
│── README.md   # This guide
```

## Deployment

To deploy, use platforms like **Vercel** for frontend and **Render/Heroku** for backend.

---

Enjoy coding! 🚀
