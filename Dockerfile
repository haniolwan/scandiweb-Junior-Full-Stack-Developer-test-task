FROM php:8.1-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    unzip \
    zip \
    libzip-dev \
    git \
    curl \
    libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions - separate command for better visibility
RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-install zip

# Verify PDO MySQL extension is installed
RUN php -m | grep pdo

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

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Create a custom php.ini to ensure extensions are enabled
RUN echo "extension=pdo_mysql.so" > /usr/local/etc/php/conf.d/docker-php-ext-pdo_mysql.ini

EXPOSE 80