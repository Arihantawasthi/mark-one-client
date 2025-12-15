FROM node:24-slim AS build

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .

ARG VITE_MODE=production
RUN npm run build -- --mode $VITE_MODE

EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
