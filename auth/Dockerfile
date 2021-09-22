# Initialize a new build stage and set the base image for subsequent instructions
FROM node:alpine

# The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile
WORKDIR /app
# Copy package.json to the WORKDIR. If package.json is in different directory as Dockerfile, provide path accordingly
COPY package.json .
# Install dependency in working directory. Because we are running npm install in the container, we don't want to load up node_modules into our container as it gets built; add node_modules to gitignore. only-prod to prevent installing dev dependencies
RUN npm install --only=prod
# Copy everything else in the same directory as your Dockerfile to working directory
COPY . .

CMD ["npm", "start"]