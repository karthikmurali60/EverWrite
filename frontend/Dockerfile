FROM node:16.18 as builder

COPY . ./frontend

WORKDIR /frontend

RUN npm install --force

RUN npm run build

# ------------------------------ #

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /frontend/build /usr/share/nginx/html

COPY --from=builder /frontend/.nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
