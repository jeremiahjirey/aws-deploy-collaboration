# Tahap 1: Build Aplikasi Next.js
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependensi 
RUN npm install

# Salin seluruh kode aplikasi ke container
COPY . .

# Build aplikasi Next.js untuk produksi
RUN npm run build

# Tahap 2: Jalankan Aplikasi dalam Mode Produksi
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment variable untuk produksi
ENV NODE_ENV=production

# Salin hasil build dari tahap builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Salin file package.json dan package-lock.json
COPY --from=builder /app/package*.json ./

# Install dependensi hanya untuk produksi
RUN npm install --production

# Ekspose port 
EXPOSE 3000

CMD ["npm", "start"]
