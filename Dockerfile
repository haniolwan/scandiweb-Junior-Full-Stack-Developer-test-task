FROM php:8.1-apache

# Install system dependencies & PHP extensions
RUN apt-get update && apt-get install -y \
    unzip \
    zip \
    libzip-dev \
    git \
    curl \
    && docker-php-ext-install pdo pdo_mysql zip

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy app files
COPY . /var/www/html

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Run composer install
RUN composer install --no-dev --optimize-autoloader

# Make sure Apache can read files
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
