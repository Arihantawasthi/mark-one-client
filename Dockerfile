FROM node:24-slim AS build

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .

COPY .env.production .env.production
ENV NODE_ENV=production

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
