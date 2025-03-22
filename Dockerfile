# Stage 1: Build
FROM node:20 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the entire app
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve production build
FROM caddy:2.7.6-alpine

# Copy built files from the previous stage
COPY --from=build /app/dist /usr/share/caddy

# Expose port 3000
EXPOSE 3000

# Caddy will serve the static files automatically
