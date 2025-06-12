# 📝 Todo List Web Application

A full-stack **Todo List** web application with:

- **Frontend** built in [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Backend** powered by [NestJS](https://nestjs.com/)
- **CI/CD** using GitHub Actions
- **Deployment** on a virtual machine provisioned with [Terraform](https://www.terraform.io/) in **Microsoft Azure**

---

## 🚀 Project Overview

This application allows users to create, manage, and delete todo tasks in a clean, responsive interface. It's split into two independent services:

- **Frontend**: A modern UI built with React + Vite for optimal performance and fast build times.
- **Backend**: A RESTful API developed using NestJS to handle business logic and data persistence.

---

## 🛠️ Technologies Used

### Frontend
- React
- Vite
- TypeScript

### Backend
- NestJS
- TypeScript
- SQLITE

### DevOps
- Docker
- GitHub Actions
- Azure Virtual Machine (via Terraform)
- Terraform for Infrastructure as Code

---

## ⚙️ CI/CD Pipeline

A GitHub Actions pipeline is configured to automate builds and deployments:

- Trigger: Push to `Todo-CICD` branch (only if commit message starts with `CICD`)
- Steps:
  1. Checkout code
  2. Generate `.env` files using GitHub Secrets
  3. Build Docker images for frontend and backend
  4. Push images to Docker Hub
  5. Connect to Azure VM over SSH
  6. Deploy pulled Docker containers

This ensures that every update to the `Todo-CICD` branch results in an automated, consistent deployment.

---

## ☁️ Infrastructure

The infrastructure is managed via **Terraform**, which provisions:

- An **Azure Virtual Machine** to host Docker containers
- SSH key-based authentication
- Network rules, storage, and other Azure resources

---

## 📦 Environment Variables

All sensitive data such as database URLs, JWT secrets, and API endpoints are managed securely using **GitHub Secrets**.

These secrets are injected into the GitHub Actions pipeline during the CI/CD process and written into `.env` files **before the Docker images are built**.

### Backend (`project1-backend/.env`)
```env
DATABASE_URL=${{ secrets.DATABASE_URL }}
JWT_KEY=${{ secrets.JWT_KEY }}
CORS_ORIGIN=${{ secrets.CORS_ORIGIN }}
```

### Frontend (`project1-react/.env`)
```env
REACT_APP_API_BASE_URL=${{ secrets.REACT_APP_API_BASE_URL }}
```
