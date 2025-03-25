# Use the official Node.js image as a base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies (including dev dependencies)
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose port 3000 for Next.js (default port)
EXPOSE 3000

# Start the Next.js app in development mode using `npm run dev`
CMD ["npm", "run", "dev"]
