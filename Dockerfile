FROM node:18 AS builder
WORKDIR /express
COPY package.json .
RUN npm install
COPY . .
WORKDIR /react
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN cp -r build ./express/dist

FROM node:slim
WORKDIR /express
COPY --from=builder /express ./
CMD ["node", "index.js"]
EXPOSE 5000