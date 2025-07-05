FROM nginx:latest

# Удаляем стандартный файл конфигурации Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем главную конфигурацию Nginx
COPY tooling/configs/nginx/nginx.conf /etc/nginx/nginx.conf

# Копируем папку с конфигурациями виртуальных хостов (где будет лежать main-routes.conf)
COPY tooling/configs/nginx/conf.d/ /etc/nginx/conf.d/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]