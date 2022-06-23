# Stage 1 - build
FROM node:16-alpine as build 

RUN apk add --no-cache libc6-compat

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

# Stage 2
FROM node:16-alpine as run

ENV HOME /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR ${HOME}

COPY --from=build  /app/next.config.js ./
COPY --from=build  /app/public ./public
COPY --from=build  /app/.next ./.next
COPY --from=build  /app/node_modules ./node_modules

RUN chmod -R 777 /app/.next/cache

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
