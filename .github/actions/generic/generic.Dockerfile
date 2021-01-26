# this container runs 'generic.sh' to build another container, because it's
# not possible to dynamically specify a docker file or an image in github actions.
FROM alpine:latest

# Copy the docker files that we'll build.
COPY image-actions /image-actions
COPY generic.sh /generic.sh

RUN apk add --update --no-cache docker
RUN chmod +x /generic.sh

ENTRYPOINT ["/generic.sh"]
