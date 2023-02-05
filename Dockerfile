FROM node:18-alpine as development
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production
COPY .env .
COPY --from=development /app/dist ./dist
CMD ["node","dist/index.js"]