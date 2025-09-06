# Use an official Node.js image with Debian so apt-get works
FROM node:22

# Install system dependencies
RUN apt-get update && \
    apt-get install -y ffmpeg python3 python3-pip && \
    pip3 install --no-cache-dir openai-whisper && \
    npm install -g yt-dlp && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files and install Node dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of your backend code
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Start the server
CMD ["npm", "start"]
