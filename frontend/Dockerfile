# # base image
# FROM node:9.6.1

# # set working directory
# RUN mkdir /frontend/src/app
# WORKDIR /frontend/src/app
# ADD . /frontend/src/app

# # add `/usr/src/app/node_modules/.bin` to $PATH
# ENV PATH /frontend/src/app/node_modules/.bin:$PATH

# # install and cache app dependencies
# COPY package.json /frontend/src/app/package.json
# RUN npm install 
# RUN npm install react-scripts@1.1.1 -g 

# # start app
# CMD ["npm", "start"]


# https://medium.com/yld-engineering-blog/deploy-your-create-react-app-with-docker-and-ngnix-653e94ffb537
FROM nginx:1.15.2-alpine
COPY ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]



# production environment
# FROM nginx:1.13.9-alpine
# RUN rm -rf /etc/nginx/conf.d
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
