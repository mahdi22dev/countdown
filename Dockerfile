FROM node:14-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app
# Install dependencies based on the preferred package manager
COPY package.json ./
# Omit --production flag for TypeScript devDependencies
RUN npm install

COPY . .
RUN npx prisma generate

EXPOSE 3000



CMD ["npm", "run", "dev"]