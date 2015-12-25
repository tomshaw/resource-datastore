<?php
/**
 * This makes our life easier when dealing with paths. Everything is relative
 * to the application root now.
 */
chdir(dirname(__DIR__));

// Decline static file requests back to the PHP built-in webserver
if (php_sapi_name() === 'cli-server') {
    $path = realpath(__DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    if (__FILE__ !== $path && is_file($path)) {
        return false;
    }
    unset($path);
}

defined('DS') || define('DS', DIRECTORY_SEPARATOR);

//define("SESSION_LIFETIME", 60 *60 * 24); // one day
define("SESSION_LIFETIME", 31207680 * 5); // five years

ini_set('session.gc_maxlifetime', SESSION_LIFETIME); // for server
ini_set('session.cookie_lifetime', SESSION_LIFETIME); // for browser

defined('APPLICATION_PATH') || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/..'));

// Setup autoloading
require 'init_autoloader.php';

// Run the application!
Zend\Mvc\Application::init(require 'config/application.config.php')->run();
