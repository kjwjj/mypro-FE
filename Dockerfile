FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# nginx stage
FROM nginx:stable-alpine
# 기존 html 삭제
RUN rm -rf /usr/share/nginx/html/*
# React 빌드 결과 복사
COPY --from=build /app/dist /usr/share/nginx/html
# SPA용 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]