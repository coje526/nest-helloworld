###################
# Prebuild stage
###################
FROM node:18.14.0-alpine3.16 As prebuild

WORKDIR /usr/src
COPY --chown=node:node ./package-lock.json .
COPY --chown=node:node ./package.json .
RUN npm ci --production=false --legacy-peer-deps

USER node

###################
# Build stage
###################
FROM node:18.14.0-alpine3.16 As build

WORKDIR /usr/src

COPY --chown=node:node  . .
COPY --chown=node:node --from=prebuild /usr/src/node_modules ./node_modules

ENV NODE_ENV staging
RUN npm run build && \
    npm ci --only=production --legacy-peer-deps && \
    npm cache clean --force

USER node

###################
# Deploy stage
###################
FROM node:18.14.0-alpine3.16 As deploy

WORKDIR /code

RUN apk update && \
    apk add bash --no-cache bash curl redis && \
    rm -rf /var/cache/apk/*

COPY --chown=node:node ./healthcheck /usr/local/bin/
RUN chmod +x /usr/local/bin/healthcheck

COPY --chown=node:node --from=build /usr/src/ecosystem.config.js .
COPY --chown=node:node --from=build /usr/src/dist ./dist
COPY --chown=node:node --from=build /usr/src/node_modules ./node_modules

RUN npm install pm2 -g

CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "staging" ]
#CMD [ "tail", "-f", "/dev/null" ]