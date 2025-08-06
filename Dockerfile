FROM node:20-alpine3.19 AS builder


RUN apk add --no-cache gcompat \
    && mkdir -p /lib64 \
    && ln -sf /usr/glibc-compat/lib/ld-linux-x86-64.so.2 /lib64/ld-linux-x86-64.so.2


RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont \
    libx11 \
    libxcb \
    libxdamage \
    libxext \
    libxfixes \
    libxrandr \
    libxrender


ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    CHROMIUM_FLAGS="--no-sandbox --disable-dev-shm-usage"


ARG DOCKER_NODE_ENV
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN npm install -g corepack && corepack enable pnpm

WORKDIR /www

COPY . ./

RUN pnpm install --frozen-lockfile
RUN case ${DOCKER_NODE_ENV} in \
    test) \
    cp /www/config_devops/config .env.test && pnpm run build:test \
    ;; \
    production) \
    cp /www/config_devops/config .env.production && pnpm run build \
    ;; \
    *)\
    ;; \
    esac



FROM nginx:alpine


COPY --from=builder /www/dist /usr/share/nginx/html

COPY --from=builder /www/config_devops/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 9617
