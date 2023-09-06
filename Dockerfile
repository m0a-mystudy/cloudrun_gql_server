FROM golang:1.21 as go
FROM litestream/litestream as litestream

FROM gcr.io/google.com/cloudsdktool/cloud-sdk:alpine
COPY --from=go  /usr/local/go /usr/local/go
COPY --from=litestream /usr/local/bin/litestream /usr/local/go/bin/litestream

RUN apk add build-base

ENV PATH /usr/local/go/bin:$PATH
ENV GOBIN /usr/local/go/bin
RUN CGO_ENABLED=1 go install -tags 'sqlite3' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

COPY ./ /app
WORKDIR /app
RUN CGO_ENABLED=1  go build -o app ./cmd/server

RUN chmod +x run.sh

EXPOSE 8080
ENV PORT 8080
ENV HOSTNAME "0.0.0.0"

CMD ["./run.sh"]