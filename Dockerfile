FROM node:onbuild

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY /src /usr/src/app

RUN npm install

EXPOSE 8084

CMD ["node", "api_captcha.js"]
