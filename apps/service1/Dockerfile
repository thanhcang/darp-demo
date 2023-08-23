# Use an official Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock (or package-lock.json) to the container
COPY ../../package.json package-lock.json ./

# Install Nx CLI globally
RUN npm install -g @nrwl/cli

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port (if your applications need to listen on a specific port)
EXPOSE 4000

# Set the entry command
#CMD ["nx", "serve", "service1"]
CMD ["node", "dist/apps/service1/main.js"]
