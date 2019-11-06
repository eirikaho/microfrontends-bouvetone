################################################################################
# Kjører bygg i egen byggkontainer: ref: https://github.com/nodejs/docker-node #
################################################################################
FROM node:alpine as builder

RUN mkdir -p /app
WORKDIR /app
COPY . .

RUN npm install --loglevel info
RUN npm run lint --loglevel info
RUN npm test --loglevel info
RUN npm run build --loglevel info
RUN npm run owasp_check
RUN npm prune --production --json

###################################
# Lager kontainer for deployment. #
###################################
FROM node:alpine

# Sett riktig tidssone for image og container. Ellers vil dette bli en eller annen default som vi ikke har kontroll over.
ENV TZ=Europe/Oslo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Bytt bruker.
USER node
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Setter ENV-variable som settes på hvert logginnslag.
ENV NAME "react"

WORKDIR /home/node

EXPOSE 3003

COPY --from=builder /app .

HEALTHCHECK --start-period=30s --interval=30s --timeout=30s CMD node healthcheck.js

CMD ["npm", "run", "backend", "--loglevel", "info"]
