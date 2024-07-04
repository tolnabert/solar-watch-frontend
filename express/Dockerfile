FROM node:18 AS builder
WORKDIR /express
COPY package.json .
RUN npm install
COPY . .


FROM node:slim
WORKDIR /express
COPY --from=builder /express ./
CMD ["node", "index.js"]
EXPOSE 5000