FROM node:18
WORKDIR /app
COPY server .
RUN npm install
CMD ["node", "app.js"]
