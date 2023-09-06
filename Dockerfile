FROM asia-northeast1-docker.pkg.dev/m0a-dev/repository/base

COPY ./ /app
WORKDIR /app

RUN go build -o app ./cmd/server
RUN chmod +x run.sh

EXPOSE 8080
ENV PORT 8080

CMD ["./run.sh"]