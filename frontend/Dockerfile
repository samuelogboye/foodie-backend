FROM node:16-alpine

WORKDIR /app

# add '/app/node_modules/.bin' to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
# RUN npm config set fetch-retry-maxtimeout 60000
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
# RUN npm run build

# Expose the port that your app will run on (usually 3000 by default for development)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
