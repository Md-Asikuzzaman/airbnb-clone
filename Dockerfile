FROM node:latest

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install

EXPOSE 3000

# Run the application.
CMD ["npm", "run", "dev"]


# docker build -t image-name:1.0 .
# docker run -d -p 3000:3000 image-name:1.0
