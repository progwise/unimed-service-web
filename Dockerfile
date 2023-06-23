FROM node:18-alpine
#RUN apk add --no-cache libc6-compat python3 make g++
#RUN apk update
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

RUN npm install http-server -g
#RUN addgroup --system --gid 1001 nodejs
#RUN adduser --system --uid 1001 web
#USER web
EXPOSE 8080
CMD ["http-server", "/app/dist", "--cors"]
