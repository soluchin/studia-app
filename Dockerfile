# Stage 1: Build the Vite React frontend
FROM node:18-alpine AS frontend-build

# Set working directory for frontend
WORKDIR /app/frontend

# Copy the frontend code
COPY frontend/package*.json ./
COPY frontend/ ./

# Copy if you use typescript
# COPY tsconfig*.json ./

# Install dependencies and build the frontend
RUN npm install && npm run build

# Stage 2: Build the NestJS backend
FROM node:18-alpine AS backend-build

# Set working directory for backend
WORKDIR /app

# Copy the backend code
COPY src/ ./src
COPY package*.json ./

# Copy the Nest CLI and app's configuration files
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install dependencies and build the backend
RUN npm install && npm run build

# Stage 3: Final runtime image
FROM node:18-alpine

# Set working directory for runtime
WORKDIR /app

# Copy built NestJS backend and dependencies
COPY --from=backend-build /app/dist ./dist
COPY --from=backend-build /app/package*.json ./

# Copy built Vite React frontend into the static directory of NestJS
COPY --from=frontend-build /app/frontend/dist ./frontend/dist
COPY --from=backend-build /app/package*.json ./frontend

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force
WORKDIR /app/frontend
RUN npm ci --only=production && npm cache clean --force

WORKDIR /app

# Expose the port your NestJS app runs on
EXPOSE 3000

# Set the command to run the NestJS server
CMD ["npm", "run", "start:prod"]