# syntax = docker/dockerfile:1.3
# FROM hub.saobang.vn/nextpay-common/node:16.19.1-alpine3.17 as build-stage
FROM node:18.20.2-alpine3.18 as build-stage
ENV NODE_OPTIONS=--max-old-space-size=4096
WORKDIR /app
COPY . .
RUN --mount=type=cache,target=/root/.npm npm ci
RUN npm run build

# production stage
FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
