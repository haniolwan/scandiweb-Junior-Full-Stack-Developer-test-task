FROM php:8.1-apache

# Install system dependencies & PHP extensions
RUN apt-get update && apt-get install -y \
    unzip \
    zip \
    libzip-dev \
    git \
    curl \
    libmysqlclient-dev \  
    && docker-php-ext-install pdo pdo_mysql zip \ 
    && rm -rf /var/lib/apt/lists/*

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy Apache config
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Set working directory
WORKDIR /var/www/html

# Copy app files
COPY . /var/www/html

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Fix permissions
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80