# Build stage
FROM node:21-alpine as builder

# Install dependencies for building native modules
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install

COPY . .
COPY ./.env .env

# Final stage
FROM node:21-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 3000

CMD ["yarn", "start"]


