# frontend Dockerfile
# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
# RUN npm config set fetch-retry-maxtimeout 60000
RUN npm i

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your app will run on (usually 3000 by default for development)
EXPOSE 5175

# Start the application
CMD ["npm", "run", "dev"]
