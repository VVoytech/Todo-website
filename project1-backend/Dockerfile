# Use Node.js 20.11.1 base image
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

#Copy prisma folder
COPY ./prisma ./prisma

# Install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Generate Prisma Client code
RUN npx prisma generate

# Expose the port the app runs on, here, I was using port 9000
EXPOSE 9000

# Command to run the app
CMD [  "npm", "run", "start:prod" ]