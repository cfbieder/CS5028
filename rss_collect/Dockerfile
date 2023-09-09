FROM node:18
# Create app directory
WORKDIR /usr/src/rss_collect
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
COPY . .
EXPOSE 5000
CMD [ "npm", "run", "mock" ]