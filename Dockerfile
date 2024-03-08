# Use the official Node.js 18 image as a parent image
FROM node:18 AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if you have one)
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Attempt to workaround the npm bug before building
RUN rm -rf node_modules package-lock.json && npm install --force

# Declare build arguments
ARG VITE_MAPBOX_KEY
ARG VITE_MAPBOX_STYLE
ARG VITE_TRAVEL_ENDPOINT
ARG VITE_UNSPLASH_CLIENT_ID
ARG VITE_ENV

# Set environment variables from build arguments
ENV VITE_MAPBOX_KEY=$VITE_MAPBOX_KEY \
    VITE_MAPBOX_STYLE=$VITE_MAPBOX_STYLE \
    VITE_TRAVEL_ENDPOINT=$VITE_TRAVEL_ENDPOINT \
    VITE_UNSPLASH_CLIENT_ID=$VITE_UNSPLASH_CLIENT_ID \
    VITE_ENV=$VITE_ENV

# Build the application
RUN npm run build

# Start the second stage with Nginx to serve the static files
FROM nginx:alpine

# Copy static files from builder stage
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Override the default nginx.conf with our custom file
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80

# No need for CMD because the base Nginx image has an entrypoint that starts Nginx