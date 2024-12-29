# Grocery Booking APIs

These are the APIs for a grocery shop.

 Utilized Postgres as the Relational Database and built the application using Nest.js with Typescript for strict type checking and the project structure is fully modules based.

Managing Role Based Authentication and API access was also a key focus. Developed idempotency check to reduce duplicate orders, using errors added logging for failed transactions. 
 Docker was used for containerizing the project and database to facilitate deployment and maintenance.

 ## 🚀 Features

- **TypeScript Support** - Strongly typed codebase for better maintainability
- **Admin Guard and  Authentication** - Secure API access control with JWT and Guards 
- **Docker Support** - Containerized application and database
- **Postgres Database** - Relational database 
- **Logging** - Using Pino

## Docker commands
Build and run with Docker Compose
```
docker-compose up  --build
```

## Available Scripts

In the project root directory, you can run:

### `npm start`

Run the application in production mode. It executes the compiled JavaScript file located at `dist/index.js` using Node.js.

### `npm run build`

Builds the TypeScript files into JavaScript files. It transpile the TypeScript code to JavaScript using the TypeScript compiler (`tsc`) and generates the output in the `dist` directory.


### `ENV Variables`

```
DB_URL=postgres://postgres:postgres@postgres:5432/postgres

```

  ## 📚 API Documentation

- API documentation is available at `/api-docs` when running the server.
- Open Swagger api docs for project by using [text](http://localhost:3000/apidocs#/) url once project is started.

![alt text](swagger.png)