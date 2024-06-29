

#STAGE 1: Build the application

# Use the official Node.js 20 image as the base image
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# copy the package.json and package-lock.json files 
COPY package*.json ./

# install the dependencies  
RUN npm install

# copy the source code inside the docker image
COPY . .    

# build the application
RUN npm run build


#STAGE 2: production stage

FROM node:18

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Set the working directory inside the container
WORKDIR /app

# copy the package.json and package-lock.json files 
COPY package*.json ./

# install only production dependencies
RUN npm install --only=production

# copy the build folder from the previous stage 
COPY --from=builder /app/dist ./dist

# expose the port
EXPOSE 3000

# start the application 
CMD [ "npm", "run", "serve"]