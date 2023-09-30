FROM node:18 as build-stage
# Create app directory
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "docker"]
