# Spendwise
A modern expense tracking solution built with Spring Boot, React, and MySQL.

- Created a comprehensive full-stack expense tracking web application, enabling efficient day-to-day financial management.
- Integrated multi-role functionality with user authentication to ensure secure access for both users and administrators, including features such as sign-in, sign-up, password reset, and email verification.
- Designed user-friendly dashboards for managing transactions, tracking upcoming/recurring expenses, generating monthly summaries and statistics, and overseeing budgets.
- Added management features such as search, filter, and pagination for enhanced usability.

## Prerequisites

### Development Tools
- IDE, for example:
  - [Visual Studio Code](https://code.visualstudio.com/)
    - Install extension packs for <b>Java and Spring boot in vscode</b>. These will take care of building the springboot backend.
      - Java Extension Pack: https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack
      - Spring Boot Extension Pack: https://marketplace.visualstudio.com/items?itemName=vmware.vscode-boot-dev-pack
  - [IntelliJ IDEA](https://www.jetbrains.com/idea/) (Community or Ultimate edition)

### Backend Requirements
- Java Development Kit (JDK) 21 or higher

### Frontend Requirements
- [Node.js](https://nodejs.org/) 20.x or higher
- npm 10.x or higher

### Database Requirements
- [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose (included with Docker Desktop)
- Database Client, for example:
  - [MySQL Workbench](https://www.mysql.com/products/workbench/)
  - [DBeaver](https://dbeaver.io/) (Universal Database Tool)
  - [TablePlus](https://tableplus.com/)

## Installation Steps

### 1. Setting Up Development Environment

#### Install Git
```bash
# macOS (using Homebrew)
brew install git

# Windows
Download and install from https://git-scm.com/
```

#### Install Java
```bash
# macOS (using Homebrew or your IDE or https://www.oracle.com/sa/java/technologies/downloads/)
brew install openjdk

# Windows
Download and install JDK from https://www.oracle.com/sa/java/technologies/downloads/
```

#### Install Node.js and npm
```bash
# macOS (using Homebrew)
brew install node

# Windows
Download and install from https://nodejs.org/
```

#### Install Docker
- Download and install Docker Desktop from [Docker's official website](https://www.docker.com/products/docker-desktop/)
- Ensure Docker Desktop is running before proceeding with the project setup

### 2. Database Setup
```bash
# Start the MySQL database using Docker Compose
docker-compose up -d
```

### 3. Backend Setup
- Run `ExpenseTrackerApplication.java` using your IDE

### 4. Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

### 5. Test the Application
You can log in using the following users:
- admin@gmail.com / testing1234
- user@gmail.com / testing 1234

## Verifying Installation

1. Backend API should be running on `http://localhost:8080`
2. Frontend application should be accessible at `http://localhost:3000`
3. MySQL database should be running on port `3306`

## Common Issues and Troubleshooting

1. **Port Conflicts**: Ensure ports 8080, 3000, and 3306 are not in use by other applications
2. **Docker Issues**: Make sure Docker Desktop is running before starting the application
3. **Database Connection**: Verify MySQL container is running using `docker ps`
4. **Java Version**: Ensure JAVA_HOME is properly set to JDK 21
