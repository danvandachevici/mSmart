#build stage
FROM node:12
#in order to easily clear up the build phases
#do this: docker image prune --filter label=stage=builder
LABEL stage=build
COPY $PWD/ /app/
WORKDIR /app/
RUN npm install
RUN npm run build --prod


#run stage
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /app/dist/mSmart /usr/share/nginx/html
EXPOSE 80

