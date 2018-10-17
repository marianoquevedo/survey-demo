FROM node:10.12.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --quiet --production && \
	npm cache clean --force

COPY . .

EXPOSE 3000
CMD [ "npm", "start"]