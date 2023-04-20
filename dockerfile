FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build for production
RUN npm run build

# Set environment variables
ENV HOST 0.0.0.0
ENV PORT 4173

# Serve the production code
CMD ["npm", "run", "serve"]