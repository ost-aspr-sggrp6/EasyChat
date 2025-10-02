# Build Stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

# Serve Stage
FROM nginx:alpine
COPY --from=build /app/dist/<dein-angular-projektname> /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
