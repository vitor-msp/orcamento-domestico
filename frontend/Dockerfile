FROM node:18.13.0-bullseye AS builder
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:18.13.0-bullseye
RUN mkdir /app
WORKDIR /app
COPY --from=builder /app/build ./build
COPY ./package.json .
COPY .env .
RUN npm install --only=production
EXPOSE 3001
CMD ["npx","serve","build"]