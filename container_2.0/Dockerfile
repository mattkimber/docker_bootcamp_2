FROM centos:7

LABEL maintainer "Matt Kimber"

EXPOSE 3000/tcp

ENV PORT=3000

RUN groupadd --gid 1000 node && \
  useradd --uid 1000 --gid node --shell /bin/bash --create-home node

RUN RPM_FILE=$(mktemp) && \ 
    curl -sL -o '${RPM_FILE}' https://rpm.nodesource.com/pub_8.x/el/7/x86_64/nodejs-8.10.0-1nodesource.x86_64.rpm && \
    rpm -i --nosignature --force '${RPM_FILE}' && \
rm -f '${RPM_FILE}'

COPY ./src/package.json /home/node/package.json

WORKDIR /home/node

RUN npm install

COPY ./src /home/node

ENTRYPOINT ["node", "/home/node/index.js"]
