FROM node:18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Omit --production flag for TypeScript devDependencies
RUN npm install

COPY src ./src
COPY public ./public
COPY next.config.js .

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}
# Default values for environment variables
ENV DATABASE_URL=mongodb+srv://mahdi:mahdi2019@cluster0.r3loxgy.mongodb.net/countdown?retryWrites=true&w=majority
ENV NEXTAUTH_SECRET=rgegergregegrrrrrrrrg564y76ergergeg8ow8f9w7yf9wfe
ENV GOOGLE_CLIENT_ID=834724852705-29e7qfcb7usrsbfaiouavo7lmdiucmij.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV NEXTAUTH_UR="localhost:3000"
ENV GITHUB_CLIENT_ID=Iv1.f2168ff591503343
ENV GITHUB_CLIENT_SECRET=632bc68ba66da358f1d502587d597c96254426ee
ENV TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGU4NmFlNWYzMmEzYjVjYzdlOGZlYjQwZGUwNDJhMSIsInN1YiI6IjY0YTEyNTcxNGE1MmY4MDBhZjEyN2I2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TbYwtxSpkX8VkKoghnxMD7rlXZiSFV6oFwd5iYwvBIY

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js based on the preferred package manager
RUN npx prisma generate && npm run build

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}
# Default values for environment variables
ENV DATABASE_URL=mongodb+srv://mahdi:mahdi2019@cluster0.r3loxgy.mongodb.net/countdown?retryWrites=true&w=majority
ENV NEXTAUTH_SECRET=rgegergregegrrrrrrrrg564y76ergergeg8ow8f9w7yf9wfe
ENV GOOGLE_CLIENT_ID=834724852705-29e7qfcb7usrsbfaiouavo7lmdiucmij.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV NEXTAUTH_UR="localhost:3000"
ENV GITHUB_CLIENT_ID=Iv1.f2168ff591503343
ENV GITHUB_CLIENT_SECRET=632bc68ba66da358f1d502587d597c96254426ee
ENV TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGU4NmFlNWYzMmEzYjVjYzdlOGZlYjQwZGUwNDJhMSIsInN1YiI6IjY0YTEyNTcxNGE1MmY4MDBhZjEyN2I2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TbYwtxSpkX8VkKoghnxMD7rlXZiSFV6oFwd5iYwvBIY
# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]