FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install

COPY . .

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Build the React frontend
WORKDIR /usr/src/app/frontend

RUN npm install --include=dev
RUN npm run build

# Back to the root directory
WORKDIR /usr/src/app

EXPOSE 3000

RUN chown -R node /usr/src/app

RUN npm run build

USER node

CMD ["npm", "run", "start:prod"]