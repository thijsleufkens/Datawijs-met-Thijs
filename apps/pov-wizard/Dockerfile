FROM node:22-slim AS base

WORKDIR /app

# Dependencies installeren
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Bouwen
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Zorg dat public altijd bestaat, ook als de map leeg is en niet in Git staat
RUN mkdir -p /app/public
RUN npm run build

# Productie-image
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
