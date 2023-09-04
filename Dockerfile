FROM golang:1.21 as go
FROM litestream/litestream as litestream
FROM gcr.io/google.com/cloudsdktool/cloud-sdk:slim as go-build
COPY --from=go  /usr/local/go /usr/local/go
ENV PATH /usr/local/go/bin:$PATH
ENV GOBIN /usr/local/go/bin

COPY ./ /app
WORKDIR /app
RUN go build -o main ./cmd/server

# ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.8/litestream-v0.3.11-linux-amd64-static.tar.gz /tmp/litestream.tar.gz
# RUN tar -C /usr/local/go/bin -xzf /tmp/litestream.tar.gz

FROM alpine
# 1つ目のステージからバイナリだけコピー
COPY --from=go-build /app/main ./main
COPY --from=go-build /app/run.sh ./run.sh
COPY --from=litestream /usr/local/bin/litestream /usr/local/go/bin/litestream
COPY --from=go-build /app/database.sqlite3 database.sqlite3
COPY --from=go-build /app/litestream.yml /etc/litestream.yml

CMD ["sh", "run.sh"]