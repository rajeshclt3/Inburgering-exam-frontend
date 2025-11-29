# =======================================
# Stage 1: The Build Factory (Node.js)
# =======================================
FROM node:18-alpine as builder

WORKDIR /app

# 1. Install dependencies first (better caching)
COPY package.json package-lock.json* ./
RUN npm install

# 2. Copy the rest of the source code
COPY . .

# 3. 🟢 THE MAGIC PART: Inject the API URL
# We define an ARG (Argument) that we pass during the build command
ARG VITE_API_URL

# We set it as an ENV variable so Vite can read it during 'npm run build'
ENV VITE_API_URL=$VITE_API_URL

# 4. Build the app (Creates the 'dist' folder)
RUN npm run build

# =======================================
# Stage 2: The Production Server (Nginx)
# =======================================
FROM nginx:alpine

# 5. Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 6. Copy the compiled 'dist' folder from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# 7. Expose Port 80 (Standard Web Port)
EXPOSE 80

# 8. Start the Web Server
CMD ["nginx", "-g", "daemon off;"]