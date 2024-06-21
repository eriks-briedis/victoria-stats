# Use the official Node.js image from the Docker Hub
FROM node:18-alpine

RUN apk add --no-cache chromium bash

ENV CHROME_BIN /usr/bin/chromium-browser
ENV LIGHTHOUSE_CHROMIUM_PATH /usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
