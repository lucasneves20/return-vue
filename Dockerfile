# Dockerfile
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json pnpm*.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the app
COPY . .

# Expose the port (change this to 5173)
EXPOSE 5173

# Command to run the app
CMD ["pnpm", "dev", "--host"]
