# Home

## Relevant source files

### Purpose and Scope

This page provides an overview of the **G-Point appointment management system**, introducing its purpose, architecture, core components, and technology stack. This document serves as the entry point for understanding how the system is structured and where to find detailed information about specific subsystems.

For detailed setup instructions, see **[Getting Started]**. For in-depth architectural information, see **[System Architecture]** and its subsections. For API documentation, see **[API Layer]**.

| Source File | Lines Referenced |
| :--- | :--- |
| `README.md` | 1-190 |

---

### What is G-Point

G-Point is a **full-stack appointment management platform** that enables users to book appointments with service specialists. The system supports two primary user roles:

* **Clients:** Users who book appointments for services.
* **Specialists:** Users who provide services and manage their availability through time slots.

The platform implements a clean separation between **frontend (React + TypeScript)** and **backend (ASP.NET Core)**, communicating via RESTful HTTP endpoints secured with **JWT authentication**.

| Source File | Lines Referenced |
| :--- | :--- |
| `README.md` | 27-29 |

---

## System Architecture Overview

The following diagram illustrates the complete system architecture, showing how the major components interact and mapping them to their actual implementation in the codebase:

### System Component Topology


| Source File | Lines Referenced |
| :--- | :--- |
| `README.md` | 33-62 |
| `README.md` | 65-98 |

---

### Technology Stack

The system utilizes the following technologies across its layers:

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React** | 18.x | UI component library |
| **Frontend Language** | **TypeScript** | 5.x | Type-safe client code |
| **Frontend Build Tool** | **Vite** | Latest | Fast development builds and hot reload |
| **Backend Framework** | **ASP.NET Core** | .NET 9.0 | Web API and middleware |
| **ORM** | **Entity Framework Core** | 8.x | Database access and migrations |
| **Database** | **SQL Server** | Latest | Relational data storage |
| **Authentication** | **JWT** | Latest | Stateless authentication |
| **Password Hashing** | **BCrypt.Net** | Latest | Secure password storage |
| **API Documentation** | **Swagger/OpenAPI** | Latest | Interactive API documentation |

| Source File | Lines Referenced |
| :--- | :--- |
| `README.md` | 4-7 |
| `README.md` | 48 |

---

## Project Structure Mapping

The repository is organized into distinct projects that correspond to architectural layers. The backend adheres to a clean, **layered architecture** to separate concerns.

### Backend Solution Structure


| Project Name | Purpose | Key Directories |
| :--- | :--- | :--- |
| **GPoint.API** | **Presentation Layer** | Controllers, appsettings.json, Program.cs |
| **GPoint.App** | **Business Logic/Service Layer** | Interfaces, Services |
| **GPoint.DataAccess** | **Data Access Layer** | Context, Data/Entities, Migrations |
| **GPoint.Domain** | **Domain/Contract Layer** | DTOs, Enums |

| Source File | Lines Referenced |
| :--- | :--- |
| `README.md` | 128-178 |

---

### Key Directory Locations

| Component | File Path | Description |
| :--- | :--- | :--- |
| **API Entry Point** | `GPoint.API/Program.cs` | Application startup and configuration. |
| **User Controller** | `GPoint.API/Controllers/UserController.cs` | User management endpoints. |
| **Service Controller** | `GPoint.API/Controllers/ServiceController.cs` | Service management endpoints. |
| **Slot Controller** | `GPoint.API/Controllers/SlotController.cs` | Slot management endpoints. |
| **Appointment Controller** | `GPoint.API/Controllers/AppointmentController.cs` | Appointment booking endpoints. |
| **User Service** | `GPoint.App/Services/UserService.cs` | User business logic implementation. |
| **Service Interface** | `GPoint.App/Interfaces/IUserService.cs` | User service contract (Interface). |
| **Database Context** | `GPoint.DataAccess/Context/GPointDbContext.cs` | EF Core database context configuration. |
| **User Entity** | `GPoint.DataAccess/Data/Entities/User.cs` | User database model. |
| **User DTOs** | `GPoint.Domain/DTOs/User/` | User data transfer objects. |
| **Frontend Entry** | `GPoint-Front/GPoint/src/main.tsx` | React application entry point. |
| **App Component** | `GPoint-Front/GPoint/src/App.tsx` | Root React component. |
| **API Clients** | `GPoint-Front/GPoint/src/shared/api/` | Modular HTTP client modules. |

| Source File | Lines Referenced |
| :--- | :--- |
| `README.md` | 128-178 |

---

## Core Domain Model

The system revolves around four primary entities that represent the appointment booking domain.

### Entity Relationship Overview


#### Key Domain Rules:

* A **User** with `Role = Specialist` can create **Service** records and manage **Slot** availability.
* A **User** with `Role = Client` can create **Appointment** records to book slots.
* Each **Slot** can be associated with at most one **Appointment** (enforced by the `IsBooked` flag).
* An **Appointment** links a client, specialist, service, and slot together.

| Source File | Lines Referenced |
| :--- | :--- |
| `README.md` | 39 |
| `README.md` | 47 |

---

## Key System Features

### Backend Capabilities

| Feature | Implementation | Location |
| :--- | :--- | :--- |
| **User Management** | CRUD operations for user accounts with role-based access | `GPoint.App/Services/UserService.cs` |
| **Password Security** | **BCrypt** hashing for password storage | `GPoint.App/Services/UserService.cs` |
| **JWT Authentication** | Token generation and validation middleware | `GPoint.API/Program.cs` |
| **Service Management** | Specialists can create and manage service offerings | `GPoint.App/Services/ServiceService.cs` |
| **Slot Management** | Time availability management for specialists | `GPoint.App/Services/SlotService.cs` |
| **Appointment Booking** | Client booking with slot availability validation | `GPoint.App/Services/AppointmentService.cs` |
| **Database Migrations** | Version-controlled schema management | `GPoint.DataAccess/Migrations/` |
| **API Documentation** | Interactive Swagger UI for endpoint testing | `GPoint.API` (Swagger middleware) |
| **CORS Configuration** | Cross-origin support for frontend at `localhost:5173` | `GPoint.API/Program.cs` |

| Source File | Lines Referenced |
| :--- | :--- |
| `README.md` | 42-49 |

### Frontend Capabilities

| Feature | Implementation | Location |
| :--- | :--- | :--- |
| **Authentication UI** | Login and registration forms | `GPoint-Front/GPoint/src/components/login/` |
| **Token Management** | `localStorage` persistence for JWT tokens | `GPoint-Front/GPoint/src/App.tsx` |
| **API Integration** | Modular HTTP clients for each endpoint group | `GPoint-Front/GPoint/src/shared/api/` |
| **Type Safety** | **TypeScript** types mirroring backend DTOs | `GPoint-Front/GPoint/src/shared/types/` |
| **Hot Reload** | **Vite** development server with fast refresh | `Vite` configuration |
| **Responsive Design** | Mobile and desktop support | Component CSS |

| Source File | Lines Referenced |
| :--- | :--- |
| `README.md` | 77-86 |

---

## Quick Navigation

This wiki is organized into the following major sections:

* **[Getting Started]**: Prerequisites, environment setup, and running the application.
* **[System Architecture]**: Detailed architectural patterns and layer interactions.
    * **[Backend Architecture]**
    * **[Frontend Architecture]**
    * **[Database Schema]**
* **[API Layer]**: Controller endpoints, middleware, and authentication.
* **[Application Services]**: Business logic implementation for each domain entity.
* **[Domain Model]**: DTOs, entities, and domain rules.
* **[Data Access Layer]**: Database context, migrations, and EF Core configuration.
* **[Frontend Development]**: React components and API client integration.
* **[Development Guide]**: Development workflows, testing, and CI/CD.

| Source File | Lines Referenced |
| :--- | :--- |
| `README.md` | 13-23 |

---

## CI/CD Automation

The repository includes automated wiki generation via GitHub Actions.


The workflow automatically updates wiki documentation whenever code or documentation files change, ensuring the wiki remains synchronized with the codebase.

| Source File | Lines Referenced |
| :--- | :--- |
| `.github/workflows/wiki-builder.yml` | 1-54 |

---

## Getting Started

To begin working with G-Point:

1.  **Prerequisites:** Install **.NET 9 SDK**, **Node.js**, and **SQL Server**.
2.  **Backend Setup:** Restore NuGet packages and apply EF Core migrations.
3.  **Frontend Setup:** Run `npm install` in the frontend directory.
4.  **Environment Configuration:** Create `.env` files with database connection strings.
5.  **Run:** Start the backend API and frontend development server.

For detailed instructions, see **[Getting Started]**.