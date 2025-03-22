# Build Stage
FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev
COPY . .
RUN npm run build


# Production Stage (Using Node.js + Serve)
FROM node:20
WORKDIR /app
COPY --from=build /app/dist /app/dist
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
