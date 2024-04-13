FROM node:lts-alpine3.19

WORKDIR /home/node/app
 
COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN npx prisma generate

ENTRYPOINT ["npm", "run", "server"]