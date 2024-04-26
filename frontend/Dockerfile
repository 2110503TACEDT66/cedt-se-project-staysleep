FROM node:20-alpine3.19 as base
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM base as production
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]