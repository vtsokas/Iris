<?php
/**
 * Global Configuration Override
 *
 * You can use this file for overriding configuration values from modules, etc.
 * You would place values in here that are agnostic to the environment and not
 * sensitive to security.
 *
 * @NOTE: In practice, this file will typically be INCLUDED in your source
 * control, so do not include passwords or other sensitive information in this
 * file.
 */
use Pixie\Connection;

// Create a connection, once only.
$config = array(
    'driver'    => 'mysql', // Db driver
    'host'      => '127.0.0.1',
    'database'  => 'iris',
    'username'  => 'root',
    'password'  => '',
    'charset'   => 'utf8', // Optional
    'options'   => array( // PDO constructor options, optional
        \PDO::ATTR_TIMEOUT => 5,
        \PDO::ATTR_EMULATE_PREPARES => false,
    ),
);
new Connection('mysql', $config, 'DB');

/**
 * @TODO merge
 */
return array(
    'db' => array(
        'driver'    => 'PdoMysql',
        'hostname'  => '127.0.0.1',
        'database'  => 'iris',
        'username'  => 'root',
        'password'  => '',
        'charset'   => 'utf8'
    ),
    'service_manager' => array(
        'factories' => array(
            'Zend\Db\Adapter\Adapter' => 'Zend\Db\Adapter\AdapterServiceFactory',
        ),
    ),
);

