# Use an official Node.js runtime as the base image
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code into the container
COPY . .

# Expose the port your web app is listening on
EXPOSE 80

# Command to start your web app
CMD ["npm", "start"]
