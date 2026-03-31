FROM alpine:3.20 AS source

ARG REPO_URL=https://github.com/queziajesuinod/ienlp_site.git
ARG REPO_REF=main

WORKDIR /tmp

RUN apk add --no-cache git ca-certificates && update-ca-certificates
RUN git clone --depth 1 --branch "${REPO_REF}" "${REPO_URL}" project

FROM nginx:1.27-alpine

COPY --from=source /tmp/project/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=source /tmp/project/index.html /usr/share/nginx/html/index.html
COPY --from=source /tmp/project/design_system12.html /usr/share/nginx/html/design_system12.html
COPY --from=source /tmp/project/css /usr/share/nginx/html/css
COPY --from=source /tmp/project/js /usr/share/nginx/html/js
COPY --from=source /tmp/project/images /usr/share/nginx/html/images
COPY --from=source /tmp/project/vendor /usr/share/nginx/html/vendor

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
