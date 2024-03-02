FROM node:lts-alpine

WORKDIR /app


RUN npm install -g @vue/cli@5.0.8

COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npx update-browserslist-db@latest
COPY ./ /app

CMD ["npm", "run", "serve"]