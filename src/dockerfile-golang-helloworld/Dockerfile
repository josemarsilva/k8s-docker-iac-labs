FROM golang:1.7.3
WORKDIR /app
COPY main.go .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main
CMD ["./main"]

FROM alpine:latest as final
WORKDIR /app
COPY --from=build /app/main .
CMD ["./main"]