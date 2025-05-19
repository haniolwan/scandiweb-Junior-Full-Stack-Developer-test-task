FROM php:8.1-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    unzip \
    zip \
    libzip-dev \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql zip

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Optionally copy and install dependencies (if composer.json exists in ./src)
COPY ./src/composer.json ./src/composer.lock* /var/www/html/
RUN if [ -f composer.json ]; then composer install --no-dev --optimize-autoloader; fi

# Fix permissions
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

CMD ["apache2-foreground"]
