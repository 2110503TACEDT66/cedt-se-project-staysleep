FROM node:20-alpine3.19 as base
WORKDIR /app
COPY package*.json ./
RUN npm install --production

# FROM base as builder
# WORKDIR /app
# COPY --from=base /app/node_modules ./node_modules
# COPY . .
# RUN npm run build

FROM base as production
WORKDIR /app

ENV NODE_ENV=production

COPY . .
# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/public ./public

EXPOSE 5000

CMD ["node", "server.js"]