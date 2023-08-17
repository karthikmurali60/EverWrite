FROM node:16.18

ENV PORT=3000

COPY . /frontend

WORKDIR /frontend

RUN npm install --force

EXPOSE ${PORT}

CMD ["npm", "start"]
