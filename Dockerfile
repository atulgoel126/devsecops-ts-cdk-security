# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy and build application
COPY . .
RUN npm run build

# Final stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install global dependencies and clean up in one layer
RUN npm install -g aws-cdk && \
    apk add --no-cache bash curl && \
    rm -rf /tmp/* /var/cache/apk/*

# Copy built application from builder stage
COPY --from=builder /app .

# Copy the entrypoint script and make it executable
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Create a non-root user and change ownership
RUN addgroup -S cdkuser && \
    adduser -S cdkuser -G cdkuser && \
    chown -R cdkuser:cdkuser /app

# Switch to the non-root user
USER cdkuser

# Add HEALTHCHECK instruction
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/ || exit 1

# Set the entrypoint
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]