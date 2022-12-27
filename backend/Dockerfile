FROM node:latest AS builder
RUN mkdir /api
WORKDIR /api
COPY . .
RUN npm install
RUN npm run build

FROM node:latest
RUN mkdir /api
WORKDIR /api
COPY --from=builder /api/dist ./dist
COPY ./package.json .
COPY .env .
COPY ./migrations ./migrations
RUN npm install --only=production
EXPOSE 3001
CMD ["npm","run","start"]