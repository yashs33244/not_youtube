FROM node:20
 
WORKDIR /usr/src/app
 
# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./
 
# Copy the api package.json
COPY apps/videoProcessingService/package.json ./apps/videoProcessingService/package.json

RUN apt-get update && apt-get install -y ffmpeg
RUN npm install
 
# Copy app source
COPY . .
 
EXPOSE 3000
 
CMD [ "npm","run", "start-videoProcessingService" ]