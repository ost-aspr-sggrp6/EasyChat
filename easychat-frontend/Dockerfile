# Build Stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
#COPY docker .
RUN npm run build --prod

# Serve Stage
FROM nginx:alpine
COPY --from=build /app/dist/easychat-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
