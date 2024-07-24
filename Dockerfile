# Builder stage for Express backend
FROM node:18 AS express-builder
WORKDIR /app/express
COPY express/package.json .
COPY express/package-lock.json .
RUN npm install
COPY express/ .

# Builder stage for React frontend
FROM node:18 AS react-builder
WORKDIR /app/react
COPY react/package.json .
COPY react/package-lock.json .
RUN npm install
COPY react/ .
RUN npm run build

# Final stage
FROM node:18-slim
WORKDIR /app
COPY --from=express-builder /app/express /app/express
COPY --from=react-builder /app/react/dist /app/express/dist
WORKDIR /app/express
CMD ["node", "index.js"]
EXPOSE 5000