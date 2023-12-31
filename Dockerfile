FROM node:18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json ./
# Omit --production flag for TypeScript devDependencies
RUN npm install
# Default values for environment variables
ENV DATABASE_URL=mongodb+srv://mahdi:mahdi2019@cluster0.r3loxgy.mongodb.net/countdown?retryWrites=true&w=majority
ENV NEXTAUTH_SECRET=rgegergregegrrrrrrrrg564y76ergergeg8ow8f9w7yf9wfe
ENV GOOGLE_CLIENT_ID=834724852705-29e7qfcb7usrsbfaiouavo7lmdiucmij.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV NEXTAUTH_UR="localhost:3000"
ENV GITHUB_CLIENT_ID=Iv1.f2168ff591503343
ENV GITHUB_CLIENT_SECRET=632bc68ba66da358f1d502587d597c96254426ee
ENV TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGU4NmFlNWYzMmEzYjVjYzdlOGZlYjQwZGUwNDJhMSIsInN1YiI6IjY0YTEyNTcxNGE1MmY4MDBhZjEyN2I2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TbYwtxSpkX8VkKoghnxMD7rlXZiSFV6oFwd5iYwvBIY

COPY . .

RUN npx prisma generate && npm run build

COPY .next ./.next



CMD ["npm", "run", "dev"]