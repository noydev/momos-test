FROM node:12.19.0-alpine3.9  AS builder

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN npx nx build api ${BUILD_FLAG}

FROM node:12.19.0-alpine3.9 

WORKDIR /app
COPY --from=builder /app/builder ./
ENV NODE_ENV=$NODE_ENV

CMD ["node", "./dist/apps/api/main.js"]z`