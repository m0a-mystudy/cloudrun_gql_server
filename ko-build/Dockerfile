FROM golang:1.20 as go
FROM gcr.io/google.com/cloudsdktool/cloud-sdk:slim
COPY --from=go  /usr/local/go /usr/local/go
ENV PATH /usr/local/go/bin:$PATH
ENV GOBIN /usr/local/go/bin
RUN go install github.com/google/ko@latest
RUN ko version
CMD usr/bin/env sh
