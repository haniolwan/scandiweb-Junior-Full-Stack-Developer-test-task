FROM php:apache

# Install PDO MySQL extension and other dependencies
RUN docker-php-ext-install pdo pdo_mysql

# Install Composer
# COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Optional: enable Apache mod_rewrite
RUN a2enmod rewrite
