FROM node:18.13.0-bullseye AS builder
RUN mkdir /api
WORKDIR /api
COPY . .
RUN npm install
RUN npm run build

FROM node:18.13.0-bullseye
RUN mkdir /api
WORKDIR /api
COPY --from=builder /api/dist ./dist
COPY ./package.json .
COPY .env .
RUN npm install --only=production
EXPOSE 3001
CMD ["npm","run","start"]