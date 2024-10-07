# Next.js Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Docker Deployment

To deploy this application using Docker Compose, follow these steps:

1. Ensure you have Docker and Docker Compose installed on your system.

2. Navigate to the project directory:

   ```bash
   cd path/to/frontend-project
   ```

3. Build and start the Docker containers:

   ```bash
   docker-compose up -d
   ```

   This command will build the Docker image if it doesn't exist and start the containers in detached mode.

4. Access the application at [http://localhost:3000](http://localhost:3000).

To stop the containers, run:

```bash
docker-compose down
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!