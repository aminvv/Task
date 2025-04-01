# Task Manager API

A simple and lightweight Task Management System built with NestJS, TypeORM, and MySQL. This project provides features for user registration/login, user management, profile management, and task management, designed for individual use with role-based access control (admin and regular user roles).

## Features

### Authentication
- **Sign Up**: Users can register with an email, phone number, username, and password (minimum 8 characters with upper/lowercase letters).  
- **Login**: Users can log in using their username and password.  
- **Unique Constraints**: No duplicate usernames, emails, or phone numbers allowed.  
- **Role-Based Access**: Newly registered users are assigned the "regular user" role by default.

### User Management (Admin Only)
- Retrieve a list of all users.  
- Update any user's information.  
- Delete a user (including their tasks).  
- Assign roles (Admin or Regular User) to registered users.

### Profile Management
- Users can update their personal details (except username).  
- Users can upload a profile picture.  
- Profile deletion is not allowed.

### Task Management
- **CRUD Operations**: Create, Read, Update, and Delete tasks.  
- **Task Details**:  
  - Task name  
  - Description  
  - Attachment (file upload)  
- Regular users can only manage their own tasks.

## Tech Stack
- **Framework**: NestJS  
- **Database**: MySQL with TypeORM  
- **Authentication**: JWT (Access & Refresh Tokens)  
- **Validation**: Class-validator & Class-transformer  
- **File Upload**: Multer  
- **API Documentation**: Swagger  
- **Password Hashing**: Bcrypt

## Prerequisites
- **Node.js**: v18.x or higher  
- **MySQL**: v8.x or higher  
- **npm**: v9.x or higher

## Installation

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/aminvv/Task.git
   cd Task
   ```

2. **Install Dependencies**:  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:  
   Create a `.env` file in the root directory and populate it with the following:  
   ```
   # DATABASE
   DB_PORT=3306
   DB_HOST=localhost
   DB_NAME=task_manager
   DB_PASSWORD=@Amin&1378
   DB_USERNAME=root

   # SERVER
   PORT=3000

   # TOKEN
   ACCESS_TOKEN_SECRET=fdgjkkgfdjskgjlksdf5dszfg4dsdfg54dfggh5dfsfgdadsf
   REFRESH_TOKEN_SECRET=fdgjkkdfglkdfsgldfogfdiogikdfsgjidjgifdsgdfgsoi
   ACCESS_TOKEN_EXPIRES_IN=2h
   REFRESH_TOKEN_EXPIRES_IN=7d
   ```  
   Adjust the values (e.g., database credentials) as per your local setup.

4. **Set Up the Database**:  
   - Ensure MySQL is running.  
   - Create a database named `task_manager`:  
     ```sql
     CREATE DATABASE task_manager;
     ```  
   - TypeORM will automatically sync the schema based on the entities.

5. **Run the Application**:  
   ```bash
   npm run start:dev
   ```  
   The server will start on `http://localhost:3000`.

## API Documentation
Once the server is running, visit `http://localhost:3000/api` to access the Swagger UI, which provides interactive documentation for all endpoints.

## Project Structure
```
src/
├── auth/              # Authentication module  
├── users/             # User management module  
├── profile/           # Profile management module  
├── tasks/             # Task management module  
├── module/            # Additional helper modules  
├── common/            # Shared utilities and decorators  
├── app.module.ts      # Root module  
└── main.ts            # Entry point  
```

## Scripts
- **Start in Development**: `npm run start:dev`  
- **Build**: `npm run build`  
- **Run in Production**: `npm run start:prod`  
- **Run Tests**: `npm run test`  
- **Lint**: `npm run lint`  
- **Format**: `npm run format`

## Dependencies

### Production
- `@nestjs/*`: Core NestJS packages  
- `typeorm`, `mysql2`: Database integration  
- `bcrypt`: Password hashing  
- `passport`, `passport-jwt`: Authentication  
- `multer`: File uploads  
- See `package.json` for the full list.

### Development
- `@nestjs/cli`, `@nestjs/testing`: Development tools  
- `eslint`, `prettier`: Code quality  
- `jest`, `ts-jest`: Testing  
- See `package.json` for the full list.

## Contributing
Feel free to fork the repository, create a feature branch, and submit a pull request. Ensure all tests pass and code adheres to the linting/formatting standards.

## License
This project is licensed under the MIT License.