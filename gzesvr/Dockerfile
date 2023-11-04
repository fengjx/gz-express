FROM golang:1.20.10-alpine3.17 AS builder

ENV APP_NAME=gzesvr

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY build ./build
COPY data ./data
COPY *.go ./
RUN ls -la
RUN GO111MODULE=on CGO_ENABLED=0 GOOS=linux go build -trimpath -tags=jsoniter -mod=readonly -a -installsuffix cgo -v -o ${APP_NAME} ./main.go

FROM alpine:3.18.4
RUN apk --no-cache add ca-certificates bash curl

ENV APP_NAME=gzesvr
ENV WORK_DIR=/app

WORKDIR ${WORK_DIR}

COPY --from=builder /app/build/*.sh .
COPY --from=builder /app/data ./data
COPY --from=builder /app/${APP_NAME} .
RUN ls -la

EXPOSE 8000
ENTRYPOINT ["sh", "-c", "./entrypoint.sh"]
