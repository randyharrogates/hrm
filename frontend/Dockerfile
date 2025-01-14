FROM node:22

WORKDIR /app

# Copy shared folder
COPY ./shared /app/shared

# Copy frontend
COPY ./frontend /app/frontend

WORKDIR /app/frontend
RUN npm install

CMD ["npm", "start"]
