# Start with fully-featured Node.js base image
FROM docker.registry.moah/app/node:20.12.2 AS build

USER node
WORKDIR /home/node/app

# Copy dependency information and install all dependencies
COPY --chown=node:node package.json package-lock.json ./

RUN npm set registry http://npm.registry.moah/
RUN npm ci

# Copy source code
COPY --chown=node:node . .

# Build code
ARG ENV
ENV NODE_ENV $ENV

RUN npm run build:"$NODE_ENV"


# Run-time stage
FROM docker.registry.moah/app/node:20.12.2-alpine

# Set non-root user and expose port 8080
USER node
EXPOSE 5173

WORKDIR /home/node/app

# Copy dependency information and install production-only dependencies
COPY --chown=node:node package.json package-lock.json ./

RUN npm set registry http://npm.registry.moah/ \
    npm ci

# Copy results from previous stage
COPY --chown=node:node --from=build /home/node/app/dist ./dist

RUN npm install -g live-server

CMD [ "live-server", "--port=5173", "--no-browser" ]