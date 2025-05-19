FROM php:8.1-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    unzip \
    zip \
    libzip-dev \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions using the docker-php-ext-install helper
RUN docker-php-ext-install pdo pdo_mysql zip

# Verify PDO MySQL extension is installed
RUN php -m | grep pdo

# Copy Apache config (must exist in build context)
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Enable Apache mod_rewrite
RUN a2enmod rewrite

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

# Define command to start Apache
CMD ["apache2-foreground"]