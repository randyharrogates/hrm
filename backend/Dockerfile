FROM node:22

WORKDIR /app

# Copy shared folder
COPY ../shared /app/shared

# Copy backend
COPY ./backend /app/backend

WORKDIR /app/backend
RUN npm install

CMD ["npm", "run", "dev"]
