FROM node:latest AS builder
RUN mkdir /api
WORKDIR /api
RUN cp . .
RUN npm install
RUN npm build

FROM node:latest
RUN mkdir /api
WORKDIR /api
COPY --from=builder /api/dist ./dist
COPY ./package.json .
RUN npm install --only=production
EXPOSE 3001
CMD ["npm","run","start"]