#build stage
FROM node:12
COPY $PWD/ /app/
WORKDIR /app/
RUN npm install
RUN npm run build --prod


#run stage
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /app/dist/mSmart /usr/share/nginx/html
EXPOSE 80

