FROM node:14-alpine as build

WORKDIR /build
RUN npm i -g pnpm
COPY . ./
RUN pnpm i
RUN pnpm recursive run build
RUN find . -type f -name '*.ts' -delete

FROM node:14-alpine

WORKDIR /app
RUN npm i -g pnpm
COPY --from=build /build/backend/package.json /build/pnpm-lock.yaml ./
RUN pnpm i --prefer-offline --frozen-lockfile --production
COPY --from=build /build/backend/dist ./backend
COPY --from=build /build/frontend/dist ./public

ENV PORT=3000
ENV API_PREFIX=/api
ENV STATIC_FOLDER=/app/public
ENV NO_COLOR=1

CMD /usr/local/bin/node backend/index.js
