<?php

declare(strict_types=1);

use Symfony\Component\Dotenv\Dotenv;

if (file_exists(dirname(__DIR__) . '/vendor/autoload.php')) {
    require dirname(__DIR__) . '/vendor/autoload.php';
} elseif (file_exists(dirname(__DIR__) . '/../../vendor/autoload.php')) {
    require dirname(__DIR__) . '/../../vendor/autoload.php';
} else {
    require dirname(__DIR__) . '/vendor/autoload.php';
}

if (class_exists(Dotenv::class) && file_exists(dirname(__DIR__) . '/.env')) {
    (new Dotenv())->bootEnv(dirname(__DIR__) . '/.env');
}
