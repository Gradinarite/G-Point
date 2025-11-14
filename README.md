<div align="center">
	<h1>G-Point Appointment Management System</h1>
	<p>
		<img src="https://img.shields.io/badge/.NET-9.0-blue" alt=".NET 9.0" />
		<img src="https://img.shields.io/badge/React-18.x-61dafb" alt="React" />
		<img src="https://img.shields.io/badge/TypeScript-5.x-3178c6" alt="TypeScript" />
		<img src="https://img.shields.io/badge/Entity%20Framework%20Core-8.x-68217a" alt="EF Core" />
	</p>
</div>

---

## Table of Contents
1. [About G-Point](#about-g-point)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Architecture](#architecture)
5. [Setup & Installation](#setup--installation)
6. [Usage](#usage)
7. [Folder Structure](#folder-structure)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

---

## About G-Point

> **G-Point** is a robust, scalable, and modern appointment management platform. It enables users to book, manage, and provide services efficiently. Built with a clean architecture, it separates concerns across API, business logic, data access, and domain layers, paired with a fast, user-friendly React frontend.

---

## Backend (.NET Solution)

### Structure
- **GPoint.API**: ASP.NET Core Web API project. Exposes RESTful endpoints for appointments, services, slots, and users.
- **GPoint.App**: Application layer. Contains business logic and service interfaces/implementations.
- **GPoint.DataAccess**: Data access layer. Uses Entity Framework Core for database operations, migrations, and context.
- **GPoint.Domain**: Domain models, DTOs, and enums shared across the solution.

### Key Features

- **Controllers**: Handle HTTP requests for appointments, services, slots, and users. Each controller validates input, invokes business logic, and returns appropriate responses.
- **Services**: Encapsulate business logic for managing entities and operations. Coordinate between controllers and data access, enforcing business rules.
- **Data Access**: Entity Framework Core for ORM, migrations, and database context. Handles CRUD operations, relationships, and migrations for all entities.
- **DTOs**: Data Transfer Objects for API communication. Ensure only necessary data is exposed to clients, improving security and performance.
- **Enums**: User roles and other domain-specific types. Maintain type safety and clarity in business logic.
- **Authentication & Authorization**: JWT-based authentication and role-based access control for secure endpoints.
- **Error Handling & Validation**: Centralized error handling and input validation for robust API responses.

### Configuration
- `appsettings.json` and `appsettings.Development.json`: Store environment-specific settings.
- `.env` files: Store sensitive environment variables.
- `launchSettings.json`: Local development launch profiles.

### How to Run (Backend)
1. Open `GPoint.sln` in Visual Studio or VS Code.
2. Restore NuGet packages.
3. Apply migrations (if needed):
	 - Use `Update-Database` in the Package Manager Console.
4. Run the API project (`GPoint.API`).

---

## Frontend (React + TypeScript)

### Structure
- **src/**: Main source code directory.
	- **components/**: UI components (including login, API tester, etc.).
	- **shared/api/**: API client modules for appointments, services, slots, and users.
	- **shared/types/**: TypeScript types for entities.
	- **assets/**: Static assets.
- **public/**: Static files (favicon, etc.).
- **App.tsx**: Main application component.
- **main.tsx**: Entry point.

### Key Features

- **Modern UI**: Built with React and Vite for fast development and hot reloading. Responsive design for desktop and mobile.
- **Type Safety**: TypeScript throughout for reliability and maintainability.
- **API Integration**: Communicates with the backend via RESTful endpoints using Axios. Handles authentication, CRUD, and error states.
- **Authentication**: Login component for user access, with JWT token management and protected routes.
- **Reusable Components**: Shared UI and logic for maintainability. Includes appointment forms, service lists, slot pickers, and more.
- **API Tester**: Built-in tool for testing backend endpoints directly from the frontend.
- **State Management**: Uses React hooks and context for managing global state (user, appointments, etc.).
- **Styling**: CSS Modules for scoped, maintainable styles.

### How to Run (Frontend)
1. Navigate to `GPoint-Front/GPoint`.
2. Install dependencies:
	 ```powershell
	 npm install
	 ```
3. Start the development server:
	 ```powershell
	 npm run dev
	 ```
4. Access the app at `http://localhost:5173` (default Vite port).

---

## Development & Contribution

### Prerequisites
- .NET 9 SDK
- Node.js & npm
- Visual Studio or VS Code

### Backend
- All backend projects are referenced in `GPoint.sln`.
- Use Entity Framework Core for migrations and database updates.
- Controllers and services are organized by entity type.

### Frontend
- Vite is used for fast builds and hot reloads.
- TypeScript enforces type safety.
- API clients are modular and easy to extend.

### Adding Features
- **Backend**: Add new controllers, services, and entities as needed. Update DTOs and migrations.
- **Frontend**: Add new components and API modules. Update types as needed.

---

## Folder Structure


```
GPoint/
│
├── GPoint.sln                # Solution file for all backend projects
│
├── GPoint.API/               # ASP.NET Core Web API
│   ├── Controllers/          # API controllers for appointments, services, slots, users
│   ├── Properties/           # Launch settings for local development
│   ├── appsettings.json      # Main configuration file
│   ├── appsettings.Development.json # Development-specific config
│   ├── .env                  # Environment variables (optional)
│   └── ...                   # Project files, obj/, bin/
│
├── GPoint.App/               # Application/business logic layer
│   ├── Interfaces/           # Service interfaces for each domain entity
│   ├── Services/             # Service implementations
│   └── ...                   # Project files, obj/, bin/
│
├── GPoint.DataAccess/        # Data access layer
│   ├── Context/              # EF Core DbContext
│   ├── Data/Entities/        # Entity classes for appointments, services, slots, users
│   ├── Migrations/           # Database migration files
│   ├── .env                  # Environment variables (optional)
│   └── ...                   # Project files, obj/, bin/
│
├── GPoint.Domain/            # Domain models, DTOs, enums
│   ├── DTOs/                 # Data Transfer Objects for API communication
│   ├── Enums/                # Domain enums (e.g., UserRole)
│   └── ...                   # Project files, obj/, bin/
│
└── GPoint-Front/
	└── GPoint/
		├── src/
		│   ├── components/   # React components (login, API tester, shared UI)
		│   │   └── login/    # Login page/component
		│   │   └── shared/   # Shared logic and UI
		│   │   └── ...
		│   ├── shared/
		│   │   ├── api/      # API client modules for backend endpoints
		│   │   ├── types/    # TypeScript types for entities
		│   │   └── ...
		│   ├── assets/       # Static assets (images, icons)
		│   ├── App.tsx       # Main React component
		│   ├── main.tsx      # Entry point
		│   └── ...
		├── public/           # Static files (index.html, favicon, etc.)
		├── package.json      # Frontend dependencies and scripts
		├── tsconfig.json     # TypeScript configuration
		├── vite.config.ts    # Vite build configuration
		└── ...
```

---

## License


---

## Contact
For questions or support, contact the repository owner or open an issue.

test8