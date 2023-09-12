FROM node:18
# Create app directory
WORKDIR /usr/src/parent/rss_collect
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
COPY . .
WORKDIR /usr/src/parent/
COPY ../config .
CMD [ "npm", "run", "mock" ]