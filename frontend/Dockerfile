# pull official base image for the first build step
FROM node:16-alpine as base

# add `/app/node_modules/.bin` to $PATH
# Change the workdir to a seperate folder
WORKDIR /frontend
# Create an env variable for the node modules path
ENV PATH /frontend/node_modules/.bin:$PATH
# install app dependencies by firstly copying them and installing them
COPY package.json package.json ./
COPY ./src ./src
COPY ./public ./public
RUN yarn install --network-timeout=30000
ARG REACT_APP_API_KEY
ARG REACT_APP_BASE_URL 
ENV REACT_APP_BASE_URL $REACT_APP_BASE_URL
ENV REACT_APP_API_KEY $REACT_APP_API_KEY
RUN yarn build
# start the development server
FROM base as debug
CMD ["yarn", "start"]
# start the production server
# Nginx has a cmd command to run the application by default
FROM nginx:stable-alpine as production
# We copy the created build file to the ngnix folder
COPY --from=base /frontend/build /usr/share/nginx/html
# Copy the nginx config file to be used in docker container
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf
