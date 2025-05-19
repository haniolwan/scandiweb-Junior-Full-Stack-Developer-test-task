FROM php:8.1-apache

# Install system dependencies & PHP extensions
RUN apt-get update && apt-get install -y \
    unzip \
    zip \
    libzip-dev \
    libpq-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libwebp-dev \
    libxml2-dev \
    libonig-dev \
    libmysqlclient-dev \ 
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_mysql \      
        zip \
        gd \
        exif \
        pcntl \
        bcmath

# Enable Apache modules and other configurations
RUN a2enmod rewrite
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy custom Apache config with AllowOverride All
COPY apache.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html

COPY . /var/www/html

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Fix permissions (ensure Apache user owns the files)
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80