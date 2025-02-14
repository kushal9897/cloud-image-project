FROM node:18

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend/ .

# Install backend dependencies
RUN npm install

# Copy frontend files into container
COPY frontend/ frontend/

# Expose port
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]

