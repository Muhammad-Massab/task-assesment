# Task Management App (Full Stack)

A full-stack task management application with NestJS GraphQL backend and Next.js frontend.

## How to Run Locally

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up PostgreSQL database (ensure it's running)

4. Configure database connection in src/database/database.module.ts

5. These will be the required envirment variables

```bash
DATABASE_HOST=db-host
DATABASE_PORT=db-port
DATABASE_USER=db-user
DATABASE_PASSWORD=db-password
DATABASE_NAME=db-name
PORT=backend-port
FRONT_END_PORT=frotend-url
```

6. Start the server

```bash
npm run start:dev
```

7. Access GraphQL Playground:

```bash
http://localhost:4000/graphql
```

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Add .env file

```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=graphql-api-endpoint
```

4. Start the server

```bash
npm run dev
```

## Live Deployment URLs

Live URL for frontend

```bash
http://35.178.81.153:3000/
```

Live URL for backend

```bash
http://35.178.81.153:4000/graphql
```

## Implemented

- **Backend**: NestJS GraphQL API (CRUD tasks) with PostgreSQL on AWS RDS
- **Frontend**: Next.js with Apollo Client, deployed on AWS Amplify
- **Infra**: Full AWS deployment (EC2 for backend, RDS, Amplify)
- **Core Features**: Task management with real-time updates

## Pending

- User auth (NextAuth integration)
- Task categories & filtering
- Comprehensive test suite
- CI/CD pipeline

## Key Decisions

1. AWS for scalable, integrated hosting
2. Next.js for SSR/SSG benefits over plain React
3. GraphQL for efficient data fetching
4. TypeORM for type-safe PostgreSQL queries
5. Prioritized deployment setup for assessment visibility
