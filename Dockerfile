FROM php:apache

# Install PDO MySQL extension and other dependencies
RUN docker-php-ext-install pdo pdo_mysql


# Optional: enable Apache mod_rewrite
RUN a2enmod rewrite


WORKDIR /var/www/html

# Run composer install
RUN composer install --no-dev --optimize-autoloader


EXPOSE 80
