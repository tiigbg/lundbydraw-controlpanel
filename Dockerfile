# Apache container with PHP and MySQL support, running a React App
# We start with an image that already has PHP- and MySQL-enabled apache
FROM tutum/apache-php:latest
MAINTAINER Jacob Michelsen <jacob.michelsen@tii.se>

RUN apt-get update && \
    apt-get -y install curl git nodejs npm vim

# Fix node command with a symlink
RUN ln -s /usr/bin/nodejs /usr/bin/node

# # Update npm to get around issue https://github.com/npm/npm/issues/12196
# RUN npm install -g npm

# Run NPM in separate dir. This makes it possible for Docker to cache the modules, greatly speeding up deployment
ADD package.json /tmp/package.json
RUN cd /tmp && npm install && npm install gulp -g
# Copy over to final serving location
RUN cp -a /tmp/node_modules /app

# Copy the local repo files to the served dir (and make Docker aware of them for caching)
ADD . /app

# Switch over to serving location, all subsequent commands are done relative to this
WORKDIR /app

# Run webpack
RUN npm run prod

# Expose ports. TODO: Add SSL support and expose port 443
EXPOSE 80

# .htaccess support
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf
RUN a2enmod rewrite

# Start webserver
# CMD are only executed when the container is started, while RUN is done when the container is initally built
CMD ["/run.sh"]
