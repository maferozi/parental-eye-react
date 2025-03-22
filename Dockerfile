# Use an official Node.js runtime as a base image
FROM node:lts-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight web server
FROM caddy:alpine

# Copy build output to the web server directory
COPY --from=build /app/dist /usr/share/caddy

# Expose the default port
EXPOSE 80

# Start Caddy
CMD ["caddy", "file-server", "--root", "/usr/share/caddy"]
