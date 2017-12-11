FROM node:8.9.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./worker/package.json /usr/src/app/package.json
COPY ./worker/config.json /usr/src/app/config.json
COPY ./worker/worker_factory/ /usr/src/app/worker_factory/
COPY ./worker/util/ /usr/src/app/util/
COPY ./worker/build/ /usr/src/app/build/
COPY ./worker/xunfei/ /usr/src/app/xunfei/
COPY ./worker/node_modules/ /usr/src/app/node_modules/
COPY ./worker/run.sh /usr/src/app/run.sh

RUN npm install
RUN npm install -g forever

ENV NODE_ENV test

EXPOSE 8888

CMD ["forever", "xunfei/run.js"]
