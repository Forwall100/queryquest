FROM alpine:latest

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

EXPOSE 8090

COPY . /backend_service

WORKDIR /backend_service

RUN chmod +x ./pocketbase_linux

ENTRYPOINT ["./pocketbase_linux", "serve", "--http=0.0.0.0:8090"]